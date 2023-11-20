import React, { useState } from "react";
import "../styles/Schemes.css";
import Graphs from "./Graphs";
import Typed from "typed.js";

export default function Schemes(props) {
  const [display, setDisplay] = useState("Display Schemes");
  const ref = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(ref.current, {
      strings: [`${props.reply}`],
      typeSpeed: 18,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  function displaySchemes() {
    if (display === "Display Schemes") setDisplay("Hide Schemes");
    else setDisplay("Display Schemes");
  }

  return (
    <div style={{ background: "#edf2f7", top: "96px", position: "relative" }}>
      <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex antialiased text-gray-800">
          <div class="flex flex-row h-full w-full overflow-x-hidden containerClass">
            <div class="flex flex-col flex-auto h-full p-6">
              <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full">
                <div class="flex flex-col h-full overflow-x-auto">
                  <div class="flex flex-col h-full">
                    <div class="grid grid-cols-12 gap-y-2">
                      <div
                        id="ask"
                        class="col-start-6 col-end-13 p-3 rounded-lg"
                      >
                        <div class="flex items-center justify-start flex-row-reverse">
                          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            B
                          </div>
                          <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{props.goals}</div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="reply"
                        class="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div class="flex flex-row items-center">
                          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            RW
                          </div>
                          <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>
                              <span ref={ref}></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {display === "Hide Schemes" ? (
                <>
                <div className="graphClass">
                  <Graphs
                    scheme={props.scheme[0]}
                    keys={props.keys[0]}
                    name={props.names[0]}
                  />
                </div>
                <div className="graphClass">
                  <Graphs
                    scheme={props.scheme[1]}
                    keys={props.keys[1]}
                    name={props.names[1]}
                  />
                  </div>
                  <div className="graphClass">
                  <Graphs
                    scheme={props.scheme[2]}
                    keys={props.keys[2]}
                    name={props.names[2]}
                  />
                  </div>
                </>
              ) : undefined}
              <div id="display" class="col-start-11 col-end-13 p-3 rounded-lg">
                <button
                  type="button"
                  onClick={displaySchemes}
                  class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  {display}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
