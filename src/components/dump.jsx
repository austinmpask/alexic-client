<ReactModal isOpen={modal} className={"welcome-modal"}>
  <div className="shadow flex flex-col items-center justify-center gap-6 border-neutral-50 border-2 max-h-[90%] w-[90%] sm:w-1/2 text-center text-neutral-950 text-lg rounded-4xl bg-white py-5 px-5">
    {gameState < 2 ? (
      <>
        {/* <img src="10switches.svg" className="h-18 w-auto" /> */}

        {loaded ? (
          <>
            <p className="text-4xl text-purple-400 select-none font-semibold">
              a<span className="text-purple-900">lex</span>ic
            </p>
            <div className="flex-col flex items-center gap-5 text-sm text-neutral-500">
              <div>
                <p>Create new words from the starting</p>
                <p>word to eventually turn it into today's </p>
                <p className="text-amber-500 mt-1 glow inline-flex items-center font-semibold">
                  <Pyramid size={18} className="mr-1" /> Golden Word
                </p>
              </div>
              <div className="font-semibold tracking-widest flex flex-col items-center text-lg text-neutral-950 gap-2 mb-2">
                <span className="text-lg tracking-widest">{startWord}</span>
                <MoveDown size={18} />
                <span className="text-amber-500 mt-1 box-glow inline-flex items-center bg-amber-100 border-amber-200 border-2 rounded-2xl font-semibold tracking-widest py-2 px-3">
                  <Pyramid size={18} className="mr-1" /> {target}
                </span>
              </div>
              <div>
                <p>New words are created by changing </p>
                <p>
                  <span className="font-bold text-neutral-950">one</span> letter
                  of the current word
                </p>
                {/* <p>a new valid English word</p> */}
              </div>
              <div className="grid grid-cols-3 place-items-center text-lg text-neutral-950 w-4/6 font-semibold tracking-widest">
                <p className="w-full text-right">{startWord}</p>
                <MoveRight />
                <p className="w-full text-left relative">
                  <span className="text-green-500">{example[0]}</span>
                  {example.substring(1)}
                  <Check
                    className="absolute text-green-500 top-[3px] -right-8"
                    size={20}
                  />
                </p>
                <p className="w-full text-right">{startWord}</p>
                <MoveRight />
                <p className="w-full text-left relative">
                  <span className="text-rose-500">{badExample[0]}</span>
                  {badExample.substring(1)}
                  <X
                    className="absolute text-rose-500 top-[3px] -right-8"
                    size={20}
                  />
                </p>
              </div>
              <div>
                <p>
                  Can you turn{" "}
                  <span className="text-neutral-950 font-bold">
                    {startWord.toLowerCase()}
                  </span>{" "}
                  into{" "}
                  <span className="font-bold text-amber-500">
                    {target.toLowerCase()}
                  </span>{" "}
                </p>
                <p>in under 10 transformations?</p>
              </div>
            </div>
            <button
              onClick={() => {
                setModal(false);
                gameState === 0 && setGameState(1);
              }}
              className={`${
                gameState === 0 ? "plausible-event-name=play" : ""
              } bg-purple-400 border-2 border-purple-300 py-3 cursor-pointer px-6 text-xl rounded-2xl text-white`}
            >
              {gameState === 0 ? "Play" : "Back"}
            </button>
          </>
        ) : (
          <div className="my-14 flex flex-col items-center justify-center">
            <Pyramid
              style={{
                animation: "wiggle 1.5s infinite ease",
              }}
              size={42}
              className="text-purple-300"
            />
            <p className="text-4xl text-purple-400 select-none font-semibold">
              a<span className="text-purple-900">lex</span>ic
            </p>
          </div>
        )}
      </>
    ) : gameState === 3 ? (
      <>
        {/* <img src="10switches.png" className="h-24 w-auto" /> */}
        <div className="flex-col flex w-full items-center gap-3">
          <span className="text-2xl font-semibold text-amber-500 glow inline-flex items-center">
            <WandSparkles size={20} className="mr-1" /> You Win!!!
            <ReactConfetti opacity={0.6} />
          </span>
          <img className="rounded-2xl" src="cat.gif" />
          <div className="grid gap-1 grid-cols-10 h-2 w-full sm:w-1/2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`w-full h-full ${
                  i < moves ? "bg-purple-400" : "bg-neutral-300"
                }`}
              ></div>
            ))}
          </div>
          <p className="text-3xl text-purple-500 font-semibold mt-2">
            {moves} {moves > 1 ? "Moves" : "Move"}
          </p>
          <div className="flex flex-row gap-2 mb-2 items-center justify-center">
            <RWebShare
              data={{
                url: url,
                title: `Got it in ${moves} move${moves > 1 ? "s" : ""}!`,
                text: `${winText}`,
              }}
            >
              <button className="plausible-event-name=share cursor-pointer flex bg-purple-400 border-2 button-glow border-purple-300 text-white rounded-2xl px-3 py-1 flex-row items-center justify-center gap-1">
                <Link size={20} /> Share
              </button>
            </RWebShare>
          </div>
          <div></div>
          <p className="text-sm text-neutral-500">
            Come back tomorrow for a new challenge :)
          </p>
        </div>
      </>
    ) : (
      <>
        {/* <img src="10switches.png" className="h-24 w-auto" /> */}
        <div className="flex-col flex w-full items-center gap-3">
          <span className="text-xl font-semibold inline-flex items-center">
            You Lose :(
          </span>
          <img className="rounded-2xl" src="sadcat.png" />
          <div className="grid gap-1 grid-cols-10 h-2 w-full sm:w-1/2">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className={`w-full h-full ${"bg-purple-400"}`}></div>
            ))}
          </div>

          <div className="flex flex-row gap-2 mb-2 items-center justify-center">
            <RWebShare
              disableNative={true}
              data={{
                url: url,
                title: "I suck at Alexic",
                text: "I suck at Alexic",
              }}
            >
              <button className="plausible-event-name=share cursor-pointer flex bg-purple-400 border-2 button-glow border-purple-300 text-white rounded-2xl px-3 py-1 flex-row items-center justify-center gap-1">
                <Link size={20} /> Share
              </button>
            </RWebShare>
          </div>
          <div></div>
          <p className="text-sm text-neutral-500">
            Come back tomorrow for a new challenge :)
          </p>
        </div>
      </>
    )}
  </div>
</ReactModal>;
