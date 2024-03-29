import React from "react"

const TEXTS: Record<string, any> = {
  zh: {
    title: "2021 - 2022 計畫時程",

    // pre-order
    event1: "預購",
    content1: (
      <>
        此次預購數量一共為 300 個，價格為 <b>0.03 ETH</b>。
        如果預購成功，你的以太坊錢包地址將會獲得一個隨機的 Traveloggers 盲盒。
        此 Traveloggers 盲盒將會在 2021/11/12 中午揭曉。每個錢包地址限購 5 個
        Traveloggers。
      </>
    ),
    event1_1: "開放預購",
    event1_1_content: (
      <section>
        <p>
          <b>11/05</b>
          <span>&nbsp;UTC+8:00 中午 12:00&nbsp;&mdash;&nbsp;</span>
        </p>
        <p>
          <b>11/11</b>
          <span>&nbsp;UTC+8:00 中午 12:00</span>
        </p>
      </section>
    ),

    event1_2: "盲盒揭曉",
    event1_2_content: (
      <section>
        <p>
          <b>11/12</b>
          <span>&nbsp;UTC+8:00 中午 12:00&nbsp;&mdash;&nbsp;</span>
        </p>
        <p>
          <b>11/12</b>
          <span>&nbsp;UTC+8:00 下午 14:00</span>
        </p>
      </section>
    ),
    event1_button_upcoming: "尚未開始",
    event1_button_open: "參與預購",
    event1_button_closed: "已結束",
    event1_button_sold: "預購已全數售罄",

    // airdrop
    event2: "空投",
    content2: (
      <p>
        為感謝{" "}
        <a href="https://matters.town/" target="_blank" rel="noreferrer">
          Matters.Town
        </a>{" "}
        社區用戶支持，我們會空投 300 個 Traveloggers 給綁定以太坊錢包的 Matters
        用戶。只要在 2021/11/11 中午 12 點以前成功綁定了以太坊錢包的 Matters
        用戶都有機會獲得空投。
      </p>
    ),
    event2_1: "開放登記",
    event2_1_content: (
      <section>
        <p>
          <b>11/05</b>
          <span>&nbsp;UTC+8:00 中午 12:00&nbsp;&mdash;&nbsp;</span>
        </p>
        <p>
          <b>11/11</b>
          <span>&nbsp;UTC+8:00 中午 12:00</span>
        </p>
      </section>
    ),
    event2_2: "執行空投",
    event2_2_content: (
      <section>
        <p>
          <b>11/12</b>
          <span>&nbsp;UTC+8:00 中午 12:00&nbsp;&mdash;&nbsp;</span>
        </p>
        <p>
          <b>11/12</b>
          <span>&nbsp;UTC+8:00 下午 14:00</span>
        </p>
      </section>
    ),
    event2_button_upcoming: "尚未開始",
    event2_button_open: "參與空投",
    event2_button_closed: "已結束",

    // open sale
    event3: "OpenSea 公開發售",
    content3:
      "2021/11/15 起，Traveloggers 將會在 OpenSea 公開發售，發售價從 0.06 ETH 起。",
    event3_1: "開始時間",
    event3_1_content: (
      <section>
        <p>
          <b>11/15</b>
          <span>&nbsp;UTC+8:00 中午 12:00</span>
        </p>
      </section>
    ),
    event3_button_upcoming: "尚未開始",
    event3_button_open: "進入 OpenSea 購買",
    event3_button_closed: "已結束",
    event4: "第一代 Logbook 上線",
    content4:
      "Traveloggers 的擁有者可以開啟和寫入 Logbook。第一代 Logbook 直接保存在以太坊區塊鏈主網。",
    event4_1: "功能上線",
    event4_1_content: (
      <section>
        <p>
          <b>11/19</b>
          <span>&nbsp;UTC+8:00</span>
        </p>
      </section>
    ),
    event4_button_upcoming: "尚未開始",
    event4_button_open: "進入航行日誌收藏館",
    event5: "第二代 Logbook 上線",
    content5:
      "Traveloggers 的擁有者可以領取 Logbook 2.0。第二代 Logbook 直接保存在 Polygon 主網。",
    event5_1: "功能上線",
    event5_1_content: (
      <section>
        <p>
          <b>03/21</b>
          <span>&nbsp;UTC+8:00</span>
        </p>
      </section>
    ),
    event5_button_upcoming: "尚未開始",
    event5_button_open: "進入航行日誌 2.0 收藏館",
  },
  en: {
    title: "2021 - 2022 Timeline",

    // pre-order
    event1: "Pre-orders",
    content1: (
      <>
        The pre-order amount is 300, and the price is <b>0.03 ETH</b>. If the
        pre-order is successful, you will receive a random blind box of
        Traveloggers, which will be revealed at noon on November 12, 2021. Each
        wallet address can purchase up to 5 Traveloggers.
      </>
    ),
    event1_1: "Open",
    event1_1_content: (
      <section>
        <b>12pm November 5 &mdash; 12pm November 11, 2021</b>
        <span>&nbsp;(UTC+8)</span>
      </section>
    ),
    event1_2: "Reveal",
    event1_2_content: (
      <section>
        <b>12 &mdash; 2pm, November 12, 2021</b>
        <span>&nbsp;(UTC+8)</span>
      </section>
    ),
    event1_button_upcoming: "Upcoming",
    event1_button_open: "Participate",
    event1_button_closed: "Closed",
    event1_button_sold: "Pre-order Sold Out",

    // airdrop
    event2: "Airdrops",
    content2: (
      <>
        To thank{" "}
        <a href="https://matters.town/" target="_blank" rel="noreferrer">
          Matters.Town
        </a>{" "}
        users’ support, we will airdrop 300 Traveloggers to Matters’ users who
        have connected their Ethereum wallets. Matters’ users who have connected
        their Ethereum wallets before noon on November 11, 2021 will have the
        opportunity to receive the airdrop.
      </>
    ),
    event2_1: "Open",
    event2_1_content: (
      <section>
        <b>12pm November 5 &mdash; 12pm November 11, 2021</b>
        <span>&nbsp;(UTC+8)</span>
      </section>
    ),
    event2_2: "Execute",
    event2_2_content: (
      <section>
        <b>12 &mdash; 2pm, November 12, 2021</b>
        <span>&nbsp;(UTC+8)</span>
      </section>
    ),
    event2_button_upcoming: "Upcoming",
    event2_button_open: "Participate",
    event2_button_closed: "Closed",

    // open sale
    event3: "Public Sale On OpenSea",
    content3: (
      <>
        Starting November 15, 2021, Traveloggers will be available for sale on
        OpenSea from 0.06 ETH.
      </>
    ),
    event3_1: "Open",
    event3_1_content: (
      <section>
        <b>12pm November 15, 2021</b>
        <span>&nbsp;(UTC+8)</span>
      </section>
    ),
    event3_button_upcoming: "Upcoming",
    event3_button_open: "Enter OpenSea to purchase",
    event3_button_closed: "Closed",
    event4: "Logbook 1.0",
    content4:
      "Traveloggers’ owners can record a Logbook. The first version of the Logbook will be stored on the Ethereum Mainnet directly.",
    event4_1: "Launch",
    event4_1_content: (
      <section>
        <b>November 19, 2021</b>
      </section>
    ),
    event4_button_upcoming: "Upcoming",
    event4_button_open: "Enter Logbook museum",
    event5: "Logbook 2.0",
    content5:
      "Traveloggers’ owner can claim a Logbook 2.0. The newest version of the Logbook will be stored on the Polygon Mainnet.",
    event5_1: "Launch",
    event5_1_content: (
      <section>
        <b>March 21, 2022</b>
      </section>
    ),
    event5_button_upcoming: "Upcoming",
    event5_button_open: "Enter Logbook 2.0 library",
  },
}

export default TEXTS
