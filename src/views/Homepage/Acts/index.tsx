import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"

import { Button } from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import Slide from "./slide"
import * as styles from "./styles.module.css"

type Props = {
  active: boolean
  setActive: (arg0: boolean) => void
}

const Acts: React.FC<Props> = ({ active, setActive }) => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")
  const [step, setStep] = useState(0)

  const onPrev = () => {
    if (step === 0) setActive(false)
    else setStep(step - 1)
  }
  const onNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      setStep(step + 1)
      setTimeout(() => {
        setActive(false)
        setStep(0)
      }, 600)
    }
  }

  return (
    <section
      className={classNames({
        [styles.container]: true,
        [styles.active]: active,
      })}
    >
      <Slide step={step} stepIndex={0} imgSrc="/images/story-1.png" />
      <Slide step={step} stepIndex={1} imgSrc="/images/story-2.png" />
      <Slide step={step} stepIndex={2} imgSrc="/images/story-3.png" />
      <Slide step={step} stepIndex={3} imgSrc="/images/story-4.png" />

      {
        <div
          className={styles.dialog}
          style={
            isMediumUp
              ? [
                  { top: "6rem", left: "16rem" },
                  { top: "6rem", left: "16rem" },
                  {
                    top: "50%",
                    left: "16rem",
                    transform: "translateY(-10rem)",
                  },
                  { top: "50%", left: "50%", transform: "translateY(-10rem)" },
                  {
                    top: "50%",
                    left: "50%",
                    transform: "translateY(-10rem)",
                    opacity: 0,
                  },
                ][step]
              : {}
          }
        >
          {step === 0 ? (
            <>
              <h2>
                {locale === Lang.en ? <>The Rotating Clock</> : <>自轉鐘</>}
                &nbsp;<span>({step + 1}/4)</span>
              </h2>
              <p>
                {locale === Lang.en ? (
                  <>
                    Once upon a time, strange and wonderful stars existed across
                    the galactic universe. The inhabitants of each star worked
                    at sunrise and rested at sunset, following the rhythms of
                    their star.
                  </>
                ) : (
                  <>
                    銀河宇宙曾經有許多形態各異的美麗星星。
                    人們在自己的星星時間裡日出而作、日落而息。
                  </>
                )}
              </p>
              <p>
                {locale === Lang.en ? (
                  <>
                    But the travelers of the stars felt like they were missing
                    out because they’ve never met those who lived in the other
                    stars. They dreamed of connecting the galactic universe
                    together in a more efficient way.
                  </>
                ) : (
                  <>
                    一些星際旅行家們，覺得那些一生活在自己的星星時間，從沒有見過其他星星的人，
                    錯過了太多。他們想讓銀河宇宙更有效率地、更多地連結在一起。
                  </>
                )}
              </p>
              <p>
                {locale === Lang.en ? (
                  <>
                    The answer was the invention of a smart rotational clock: by
                    equipping each star with the clock, its built-in neuron
                    algorithm automatically resets the star’s rotation period to
                    link other stars to the same rotation time.
                  </>
                ) : (
                  <>
                    於是，他們發明了帶有算法的智慧自轉鐘，每顆星星只要裝上自轉鐘，
                    鐘背後內置的神經元算法，就可以干擾、掌控、進而重新設定星星的自轉時間，
                    讓它自動與相同自轉時間的星星們接軌。
                  </>
                )}
              </p>
            </>
          ) : step === 1 ? (
            <>
              <h2>
                {locale === Lang.en ? <>Time is Energy</> : <>時間即能源</>}
                &nbsp;<span>({step + 1}/4)</span>
              </h2>
              <p>
                {locale === Lang.en ? (
                  <>
                    The stars equipped with the rotational clock formed a star
                    network. At first, it was wonderful. Spaceships shuttled
                    freely among the connected stars. The smart clock regulated,
                    adjusted, and collected the time across different stars. The
                    result was not only more efficient connections among stars,
                    but also the release of “time,” which is energy. The
                    inventors of the clock unexpectedly made a fortune.
                  </>
                ) : (
                  <>
                    自轉鐘把星星們連成了一張星網。最初的日子是很美的。
                    到處都是小飛船，在連成一片的星星之間自由穿梭。
                    同一個智慧自轉鐘，調節、改變、收集著不同星星的時間，
                    它讓連結變得高效的同時，也釋放出了許多「時間」，也就是能源。
                    因為這些多出來的時間，發明自轉鐘的旅行家，意外地發財了。
                  </>
                )}
              </p>
            </>
          ) : step === 2 ? (
            <>
              <h2>
                {locale === Lang.en ? <>Interstellar Wars</> : <>星際戰爭</>}
                &nbsp;<span>({step + 1}/4)</span>
              </h2>
              <p>
                {locale === Lang.en ? (
                  <>
                    As energy flowed into the pockets of the voyagers who
                    invented the clock, their ambitions grew. They aggressively
                    pushed the remaining half of the stars in the universe to
                    adopt the clock, and constantly changed the clock’s
                    algorithms to increase the accuracy of the connections among
                    the stars. Stars that resisted the clock were exiled to the
                    edge of the universe.
                  </>
                ) : (
                  <>
                    能源源源不斷地流進旅行家的口袋。他們的夢想與野心，都越來越大。
                    他們不斷改寫自轉鐘的算法，讓它更精確地連結，
                    然後，把不願意安裝自轉鐘的星星時間推到宇宙邊緣。
                  </>
                )}
              </p>
              <p>
                {locale === Lang.en ? (
                  <>
                    Gradually, the once complex cosmic pathway was reshaped into
                    several clear and fixed flight paths, which became stable
                    over time. Stars competed with each other to attract
                    spaceships outside their routes to obtain more energy,
                    causing interstellar wars.
                  </>
                ) : (
                  <>
                    曾經繁榮交錯的宇宙航線，慢慢變成只有幾條固定航線。
                    當星星想吸引航線之外的飛船到來，以獲得更多能源，他們就會發生爭搶，
                    為此，爆發過許多次星際戰爭。
                  </>
                )}
              </p>
            </>
          ) : (
            <>
              <h2>
                {locale === Lang.en ? (
                  `“Freedom From The Clock”`
                ) : (
                  <>脫離自轉鐘運動</>
                )}
                &nbsp;<span>({step + 1}/4)</span>
              </h2>
              <p>
                {locale === Lang.en ? (
                  <>
                    As the galactic universe was quietly changing, the smart
                    rotational clock absorbed more and more energy. It became
                    more arbitrary and overbearing in setting and changing the
                    time of the stars.
                  </>
                ) : (
                  <>
                    銀河宇宙悄悄改變的同時，自轉鐘對星星時間的設定與更改也越來越隨意、霸道了。
                    越來越多的星星，厭倦這樣被自轉鐘定義的宇宙，加入了「脫離自轉鐘運動」。
                  </>
                )}
              </p>
              <p>
                {locale === Lang.en ? (
                  <>
                    Among these rebels are young Lola, a first-time voyager,
                    lovers who took the risk to love freely, romance writers who
                    yearned to write freely, and researchers with the ability to
                    see dead stars. Together, they left the galactic universe,
                    and began their new journey in Matterverse. The story
                    continues. &nbsp;
                    <a
                      href="https://matters.news/@hi176/馬特宇宙共建計畫-24小時故事創作挑戰-最大獎將免費獲得-nft-bafyreiguse66l5cfdvosfka34zsc2saxs2ovimyacgoqhux2dnrlp3k2bq"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Click to read the story
                    </a>
                  </>
                ) : (
                  <>
                    脫離自轉鐘的遠航者們中，有在母親鼓勵下第一次遠行的少女洛拉、
                    有為了自由地去愛而冒險的愛人、有渴望自由書寫的情書作家、
                    有能看見死去的星星的研究者......他們一起離開了銀河宇宙，
                    馬特宇宙，是他們新的征途。故事還在繼續中。
                    <a
                      href="https://matters.news/@hi176/馬特宇宙共建計畫-24小時故事創作挑戰-最大獎將免費獲得-nft-bafyreiguse66l5cfdvosfka34zsc2saxs2ovimyacgoqhux2dnrlp3k2bq"
                      target="_blank"
                      rel="noreferrer"
                    >
                      點擊進入故事
                    </a>
                  </>
                )}
              </p>
            </>
          )}
          <div>
            <Button
              color="transparent"
              onClick={() => {
                analytics("click_button", {
                  type: "previous_story",
                  state: step,
                })
                onPrev()
              }}
            >
              ←&nbsp;{locale === Lang.en ? "Previous" : "上一頁"}
            </Button>
            <Button
              color="teal"
              onClick={() => {
                analytics("click_button", { type: "next_story", state: step })
                onNext()
              }}
            >
              {step < 3
                ? locale === Lang.en
                  ? "Next"
                  : "下一頁"
                : locale === Lang.en
                ? "Return to Homepage"
                : "回到主頁"}
              &nbsp;→
            </Button>
          </div>
        </div>
      }
    </section>
  )
}

export default Acts
