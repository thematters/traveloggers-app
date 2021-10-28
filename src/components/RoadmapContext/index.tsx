import React, { createContext, useEffect, useReducer } from "react"

import env from "@/.env.json"

type Context = {
  isPreOrderStarted: boolean
  isPreOrderEnded: boolean
  isAirdropStarted: boolean
  isAirdropEnded: boolean
  isOpenSaleStarted: boolean
  isOpenSaleEnded: boolean
}

export const RoadmapContext = createContext({} as Context)

export const RoadmapProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const initialState: Context = {
    isPreOrderStarted: false,
    isPreOrderEnded: false,
    isAirdropStarted: false,
    isAirdropEnded: false,
    isOpenSaleStarted: false,
    isOpenSaleEnded: false,
  }
  const reducer = (
    state: Context,
    action: { type: "update"; payload: Partial<Context> }
  ) => {
    switch (action.type) {
      case "update":
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const { preOrder, airdrop, openSale } = env.roadmap

  const updateRoadmap = () => {
    const now = new Date()

    dispatch({
      type: "update",
      payload: {
        isPreOrderStarted: !!(
          preOrder?.start && now >= new Date(preOrder.start)
        ),
        isPreOrderEnded: !!(preOrder?.end && now >= new Date(preOrder.end)),
        isAirdropStarted: !!(airdrop?.start && now >= new Date(airdrop.start)),
        isAirdropEnded: !!(airdrop?.end && now >= new Date(airdrop.end)),
        isOpenSaleStarted: !!(
          openSale?.start && now >= new Date(openSale.start)
        ),
        isOpenSaleEnded: !!(openSale?.end && now >= new Date(openSale.end)),
      },
    })
  }

  useEffect(() => {
    updateRoadmap()

    const timer = setInterval(() => {
      updateRoadmap()
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <RoadmapContext.Provider value={{ ...state }}>
      {children}
    </RoadmapContext.Provider>
  )
}
