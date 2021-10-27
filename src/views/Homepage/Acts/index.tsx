import classNames from "classnames"
import React, { useState } from "react"

import { Button } from "~/components"
import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"

type Props = {
  active: boolean
  setActive: (arg0: boolean) => void
}

const Acts: React.FC<Props> = ({ active, setActive }) => {
  const isMediumUp = useResponsive("md-up")
  const [step, setStep] = useState(0)

  const onPrev = () => {
    if (step === 0) setActive(false)
    else setStep(step - 1)
  }
  const onNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      setActive(false)
      setStep(0)
    }
  }

  return (
    <section
      className={classNames({
        [styles.container]: true,
        [styles.active]: active,
      })}
    >
      <section
        className={classNames({
          [styles.slide]: true,
          [styles.past]: step > 0,
          [styles.present]: step === 0,
          [styles.future]: step < 0,
        })}
        style={{
          backgroundImage: `url("/images/story-1.png")`,
        }}
      ></section>
      <section
        className={classNames({
          [styles.slide]: true,
          [styles.past]: step > 1,
          [styles.present]: step === 1,
          [styles.future]: step < 1,
        })}
        style={{
          backgroundImage: `url("/images/story-2.png")`,
        }}
      ></section>
      <section
        className={classNames({
          [styles.slide]: true,
          [styles.past]: step > 2,
          [styles.present]: step === 2,
          [styles.future]: step < 2,
        })}
        style={{
          backgroundImage: `url("/images/story-3.png")`,
        }}
      ></section>
      <section
        className={classNames({
          [styles.slide]: true,
          [styles.past]: step > 3,
          [styles.present]: step === 3,
          [styles.future]: step < 3,
        })}
        style={{
          backgroundImage: `url("/images/story-4.png")`,
        }}
      ></section>
      <div
        className={styles.dialog}
        style={
          isMediumUp
            ? {
                transform: [
                  `translate(10rem,6rem)`,
                  `translate(10rem,6rem)`,
                  `translate(50%,8rem)`,
                  `translate(10rem,10rem)`,
                ][step],
              }
            : {}
        }
      >
        {step === 0 ? (
          <>
            <h2>在銀河宇宙遨遊，交換信息和能源的日子</h2>
            <p>
              自轉鐘把星星們連成了一張星網。最初的日子是很美的。到處都是小飛船，在連成一片的星星之間自由穿梭。同一個智慧自轉鐘，調節、改變、收集著不同星星的時間，它讓連結變得高效的同時，也釋放出了許多「時間」，也就是能源。因為這些多出來的時間，發明自轉鐘的旅行家，意外地發財了。
            </p>
          </>
        ) : step === 1 ? (
          <>
            <h2>自轉鐘誕生，讓每顆星星之間連成星網</h2>
            <p>
              銀河宇宙曾經有許多形態各異的美麗星星。人們在自己的星星時間裡日出而作、日落而息。
              一些星際旅行家們，覺得那些一生活在自己的星星時間，從沒有見過其他星星的人，錯過了太多。他們想讓銀河宇宙更有效率地、更多地連結在一起。
              於是，他們發明了帶有算法的智慧自轉鐘，每顆星星只要裝上自轉鐘，鐘背後內置的神經元算法，就可以干擾、掌控、進而重新設定星星的自轉時間，讓它自動與相同自轉時間的星星們接軌。
            </p>
          </>
        ) : step === 2 ? (
          <>
            <h2>演算法使差距拉大，繁盛與邊緣化形成斷層</h2>
            <p>
              能源源源不斷地流進旅行家的口袋。他們的夢想與野心，都越來越大了。他們向剩下的一半星星推銷自轉鐘，不斷改寫自轉鐘的算法，讓它更精確地連結，然後，把不願意安裝自轉鐘的星星時間推到宇宙邊緣。
              曾經繁榮交錯的宇宙航線，慢慢變成清晰的幾條固定航線，不容易輕易改變。當星星想吸引航線之外的飛船到來，以獲得更多能源，他們就會發生爭搶，為此，甚至爆發過許多次星際戰爭。
            </p>
          </>
        ) : step === 3 ? (
          <>
            <h2>卸下自轉鐘，能否建立另一個宇宙</h2>
            <p>
              銀河宇宙悄悄改變的同時，自轉鐘對星星時間的設定與更改也越來越隨意、霸道了。越來越多的星星，厭倦這樣被自轉鐘定義的宇宙，開始了「脫離自轉鐘」的運動。
              脫離自轉鐘的遠航者們中有在母親鼓勵下第一次遠行的少女洛拉、有為了自由地去愛而冒險的愛人、有渴望自由書寫的情書作家、有能看見死去的星星的研究者......他們一起離開了銀河宇宙，馬特宇宙，是他們新的征途。
            </p>
          </>
        ) : (
          <></>
        )}
        <div>
          <Button color="transparent" onClick={onPrev}>
            ← Preview
          </Button>
          <Button color="teal" onClick={onNext}>
            Next →
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Acts
