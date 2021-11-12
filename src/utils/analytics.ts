/**
 * Analytic event handler
 *
 */
export const analytics = (...args: EventArgs) => {
  import("firebase/analytics").then(({ getAnalytics, logEvent }) => {
    const [eventName, eventParams] = args
    const firebaseAnalytics = getAnalytics()

    // add page type to differentiate from main site
    logEvent(
      firebaseAnalytics,
      eventName as string,
      eventParams && { ...eventParams, page_type: "traveloggers" }
    )
  })
}

type EventArgs = ["page_view"] | ["click_button", ClickButtonProp]

interface ClickButtonProp {
  type:
    | "pre_order" // pre order button on header
    | "air_drop" // air drop button on header
    | "link_account" // account linking button on header
    | "hero_preorder" // pre order from hero page
    | "hero_discord" // join discord from hero page
    | "connect_wallet" // connect wallet button in pre order dialog
    | "metamask" // choose metamask in connect wallet dialog
    | "wallet_connect" // choose wallet connect in connect wallet dialog
    | "story_line" // click watch story line
    | "previous_story" // click previous in storyline
    | "next_story" // click next in storyline
    | "more_about" // more about Matters on footer section
    | "language" // language switch
    | "footer_matters" // Matters link on footer
    | "footer_ins" // Instagram link on footer
    | "footer_fb" // Facebook link on footer
    | "footer_tt" // Twitter link on footer
    | "footer_dis" // Discord link on footer
    | "footer_tg" // Telegram link on footer
    | "footer_os" // Opensea link on footer
    | "header_dis" // Discord link on header
    | "header_tt" // Twitter link on header
    | "logbooks" // Button link to logbook page
    | "opensea" // Button link to opensea page
    | "expand_faq" // click expand icon on FAQ page
  state?: number | string // current step in storyline, or current language for language switching
  page_type?: PageType
}

type PageType = "article_detail" | "user_profile" | "circle_detail"
