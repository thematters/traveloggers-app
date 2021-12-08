import cytoscape from "cytoscape"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect, useRef, useState } from "react"
const cySpread = require("cytoscape-spread")

import { Logbook } from "~/components"
import { Lang } from "~/enums"
import { dom } from "~/utils"

import * as styles from "./styles.module.css"

const randomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

cySpread(cytoscape)

type RecentExplorerProps = {
  logbooks: Logbook[]
  onTap: (logbook: Logbook) => void
}

const RecentExplorer: React.FC<RecentExplorerProps> = ({ logbooks, onTap }) => {
  const { locale } = useLocalization()

  const explorerRef = useRef(null)
  const [cy, setCy] = useState<cytoscape.Core>()

  const onTapNode = (evt: any) => {
    const node = evt.target
    const id = parseInt(node.data("id").split("-")[1])
    const $searchBar = dom.$("#search-bar")

    if (node.data("id").includes("star") || !$searchBar) {
      return
    }

    const logbook = logbooks[id]

    // @ts-ignore
    $searchBar.value = logbook.tokenId
    onTap(logbooks[id])
  }

  const onMouseOver = (evt: any) => {
    const node = evt.target

    if (node.data("id").includes("star")) {
      return
    }

    node.style({ "border-color": "#fff" })
  }

  const onMouseOut = (evt: any) => {
    const node = evt.target

    if (node.data("id").includes("star")) {
      return
    }

    node.style({ "border-color": "#C0A46B" })
  }

  const initGraph = async () => {
    const newCy = cytoscape({
      container: explorerRef.current,

      zoom: 1,
      zoomingEnabled: false,

      style: cytoscape
        // @ts-ignore
        .stylesheet()
        .selector("edge")
        .css({ width: 0 })
        .selector(".avatar")
        .css({
          width: (node: any) => {
            const logCount = node.data("logCount")
            if (logCount <= 1) {
              return 24
            } else if (logCount == 2) {
              return 40
            } else {
              return 64
            }
          },
          height: (node: any) => {
            const logCount = node.data("logCount")
            if (logCount <= 1) {
              return 24
            } else if (logCount == 2) {
              return 40
            } else {
              return 64
            }
          },
          "background-color": "#333333",
          "background-fit": "cover",
          "background-image": (node: any) => {
            const id = parseInt(node.data("id").split("-")[1])
            return logbooks[id].tokenImageURL
          },
          "border-color": "#C0A46B",
          "border-width": 1,
        })
        .selector(".star")
        .css({
          width: (node: any) => {
            const id = parseInt(node.data("id").split("-")[1])
            const sizes = [5, 7, 10]
            return sizes[id % sizes.length]
          },
          height: (node: any) => {
            const id = parseInt(node.data("id").split("-")[1])
            const sizes = [5, 7, 10]
            return sizes[id % sizes.length]
          },
          label: "data(label)",
          color: "#B3B3B3",
          "font-size": 12,
          "text-valign": "top",
          "text-halign": "center",
          "background-fill": "linear-gradient",
          "background-gradient-stop-colors": (node: any) => {
            const colors = [
              "#5C1C18 #C98433",
              "#787876 #FFFFFF",
              "#185C5A #33A5C9",
            ]
            return colors[randomInt(0, colors.length - 1)]
          },
          "background-gradient-stop-positions": "0 81.49%",
          "background-gradient-direction": "to-top-right",
        }),

      elements: {
        nodes: [
          // avatar
          ...logbooks.map((logbook, index) => ({
            data: {
              id: `avatar-${index}`,
              logCount: logbook.logs?.length || 0,
            },
            classes: "avatar",
          })),
          // star
          ...logbooks.map((logbook, index) => ({
            data: { id: `star-${index}` },
            classes: "star",
          })),
        ],
        edges: [
          ...logbooks.map((logbook, index) => ({
            data: {
              source: `avatar-${index}`,
              target: `star-${index}` || "",
            },
          })),
        ],
      },

      layout: {
        // @ts-ignore
        name: "spread",
        fit: false, // whether to fit to viewport
        // animate: true,
        // padding: 10,
        // randomize: true,
      },
    })

    setCy(newCy)

    newCy.on("tap", "node", onTapNode)
    newCy.on("mouseover", "node", onMouseOver)
    newCy.on("mouseout", "node", onMouseOut)
  }

  useEffect(() => {
    initGraph()

    return () => {
      cy?.removeListener("tap", "node", onTapNode)
      cy?.removeListener("mouseover", "node", onMouseOver)
      cy?.removeListener("mouseout", "node", onMouseOut)
    }
  }, [])

  return (
    <>
      <p className={styles.hint}>
        {locale === Lang.en
          ? "Click the planets or search the number"
          : "點擊星球或輸入數字"}
      </p>
      <section ref={explorerRef} className={styles.explorer}></section>
    </>
  )
}

export default RecentExplorer
