import cytoscape from "cytoscape"
import { navigate } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect, useRef, useState } from "react"
const cySpread = require("cytoscape-spread")

import { Logbook, LogbookContext } from "~/components"
import { Lang } from "~/enums"
import { maskAddress, toEtherscanAddressUrl } from "~/utils"

import RecentExplorer from "./Recent"
import * as styles from "./styles.module.css"

cySpread(cytoscape)

type ExplorerProps = {
  logbook: Logbook
}

const Explorer: React.FC<ExplorerProps> & { Recent: typeof RecentExplorer } = ({
  logbook,
}) => {
  const { locale } = useLocalization()
  const { getOwnersBalance } = useContext(LogbookContext)

  const explorerRef = useRef(null)
  const [cy, setCy] = useState<cytoscape.Core>()

  const owners = [
    logbook.tokenOwner,
    ...(logbook?.logs || []).map(log => log.sender),
  ].filter(a => !!a) as string[]

  const onTapNode = (evt: any) => {
    const node = evt.target
    const id = node.id()

    if (id === "avatar") {
      navigate(locale === Lang.zh ? "/zh" : "" + `/logbooks/${logbook.tokenId}`)
    } else {
      window.open(toEtherscanAddressUrl(id).url, "_blank")
    }
  }

  const initGraph = async () => {
    const balances = await getOwnersBalance(owners)

    const newCy = cytoscape({
      container: explorerRef.current,

      zoom: 1,
      zoomingEnabled: false,

      style: cytoscape
        // @ts-ignore
        .stylesheet()
        .selector("edge")
        .css({
          width: 1,
          "line-color": "#C0A46B",
          "curve-style": "straight",
        })
        .selector("#avatar")
        .css({
          width: 76,
          height: 76,
          "background-color": "#333333",
          "background-fit": "cover",
          "background-image": logbook.tokenImageURL,
          "border-color": "#fff",
          "border-width": 2,
        })
        .selector(".owner")
        .css({
          width: (node: any) => {
            const tokenCount = node.data("tokenCount")
            if (tokenCount <= 1) {
              return 5
            } else if (tokenCount == 2) {
              return 7
            } else {
              return 10
            }
          },
          height: (node: any) => {
            const tokenCount = node.data("tokenCount")
            if (tokenCount <= 1) {
              return 5
            } else if (tokenCount == 2) {
              return 7
            } else {
              return 10
            }
          },
          label: "data(label)",
          color: "#B3B3B3",
          "font-size": 12,
          "text-valign": "top",
          "text-halign": "center",
          "background-fill": "linear-gradient",
          "background-gradient-stop-colors": (node: any) => {
            const tokenCount = node.data("tokenCount")
            if (tokenCount <= 1) {
              return "#5C1C18 #C98433"
            } else if (tokenCount == 2) {
              return "#787876 #FFFFFF"
            } else {
              return "#185C5A #33A5C9"
            }
          },
          "background-gradient-stop-positions": "0 81.49%",
          "background-gradient-direction": "to-top-right",
        }),

      elements: {
        nodes: [
          // avatar
          { data: { id: "avatar", logCount: logbook.logs?.length || 0 } },
          // owners
          ...owners.map(owner => ({
            data: {
              id: owner || "",
              label: maskAddress(owner || "", 4),
              tokenCount: balances[owner],
            },
            classes: "owner",
          })),
        ],
        edges: [
          ...owners.map(owner => ({
            data: { source: "avatar", target: owner || "" },
          })),
        ],
      },

      layout: {
        // @ts-ignore
        name: "spread",
        // animate: true,
        // padding: 10,
        // randomize: true,
      },
    })

    setCy(newCy)

    newCy.on("tap", "node", onTapNode)
  }

  useEffect(() => {
    if (!logbook) {
      return
    }

    initGraph()

    return () => {
      cy?.removeListener("tap", "node", onTapNode)
    }
  }, [logbook.tokenId])

  if (!logbook) {
    return null
  }

  return <section ref={explorerRef} className={styles.explorer}></section>
}

Explorer.Recent = RecentExplorer

export default Explorer
