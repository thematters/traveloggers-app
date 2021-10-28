import React from "react"

export const Event1 = {
  title: <p>預購</p>,
  content: (
    <p>
      此次可預購數量一共為 xxx 個, 價格為 0.03
      ETH。預購開啟後，可以點擊首頁右上角參與。如果預購成功，你將會獲得一個隨機的
      CryptoMatties。此 CryptoMatties 將會在 2021/11/10 日中午12:00
      發送到你的以太坊錢包地址。
    </p>
  ),
  time: (
    <>
      <p>2021/11/03 中午 12:00</p>
      <p>至 2021/11/09 晚上 12:00</p>
    </>
  ),
}

export const Event2 = {
  title: <p>空投</p>,
  content: (
    <p>
      為感謝 Matters 社區用戶支持，我們會空投 xxx 個 Traveloggers 給綁定了
      MetaMask 的 Matters 用戶。此次的空投會根據綁定錢包的 Matters
      用戶的活躍度來分批次空投。只要是在2021年11月9日東八區中午12點以前成功綁定了
      MetaMask 的 Matters
      用戶就有機會獲得空投。此次空投數量有限，為儘可能保證公平，獲得空投的概率會根據用戶在2021年11月1日以前在
      Matters 社區的活躍程度有所不同，即在Matters
      社區的越活躍的用戶獲得空投的概率越高。
    </p>
  ),
  time: (
    <>
      <p>2021 / 11 / 10 日 中午 12:00 至 14:00</p>
      <p>2021 / 11 / 11 日 中午 12:00 至 14:00</p>
    </>
  ),
}

export const Event3 = {
  title: <p>OpenSea公開發售</p>,
  content: (
    <p>
      2021年11月15日起，Traveloggers 將會在 OpenSea
      公開發售。此次公開發售的數量為 xxx 個, 發行價為 0.05ETH
    </p>
  ),
  time: <p>2021年11月15日</p>,
}
