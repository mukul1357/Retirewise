import React, { useEffect, useState } from "react";
import Form from "./Form";
import img from "../images/retired.png";
import img1 from "../images/bg1.jpg";
import "../styles/Service.css";
import prevArrow from "../images/prevArrow.png";
import nextArrow from "../images/nextArrow.png";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function Service(props) {
  const [categoryNo, setCategory] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const arrow = document.getElementById("arrowClassID");
    const submitButton = document.getElementById("submitForm");
    if (categoryNo === 1) {
      prev.className = "hidden arrowButton";
      next.className = "arrowButton";
      arrow.style.width = "9.5rem";
      arrow.style.float = "right";
      submitButton.className =
        "hidden relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400";
    } else if (categoryNo > 1 && categoryNo < 3) {
      prev.className = "arrowButton";
      next.className = "arrowButton";
      arrow.style.width = "66rem";
      arrow.style.float = "";
      submitButton.className =
        "hidden relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400";
    } else {
      prev.className = "arrowButton";
      next.className = "hidden arrowButton";
      arrow.style.width = "66rem";
      arrow.style.float = "";
      submitButton.className =
        "relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400";
    }

    let ele = document.getElementById(`${categoryNo}`);
    ele.className =
      "w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass";
    ele.style.fontWeight = "700";
  }, [categoryNo]);

  function prevButtonClick() {
    if (categoryNo > 1) {
      let ele = document.getElementById(`${categoryNo}`);
      ele.className =
        "inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass";
      ele.style.fontWeight = "500";
      // ele.className = "hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 catContainer";
      let contain = document.getElementById("fullWidthTabContent");
      contain.style.transform = `translate3d(-${
        (categoryNo - 2) * 64
      }rem, 0px, 0px)`;
      contain.style.transition = "transform 500ms ease 0s";
      setCategory(categoryNo - 1);
    }
  }

  function nextButtonClick() {
    if (categoryNo < 3) {
      let ele = document.getElementById(`${categoryNo}`);
      ele.className =
        "inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass";
      ele.style.fontWeight = "500";
      // ele.className = "hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 catContainer";
      let contain = document.getElementById("fullWidthTabContent");
      contain.style.transform = `translate3d(-${categoryNo * 64}rem, 0px, 0px)`;
      contain.style.transition = "transform 500ms ease 0s";
      setCategory(categoryNo + 1);
    }
  }

  async function submitForm() {
    const currAge = document.getElementById("currAge").value;
    const retAge = document.getElementById("retAge").value;
    const profession = document.getElementById("profession").value;
    const region = document.getElementById("region").value;
    const savings = document.getElementById("savings").value;
    const savGrowth = document.getElementById("savGrowth").value;
    const savYear = document.getElementById("savYear").value;
    const dependent = document.getElementById("dependent").value;
    const goals = document.getElementById("goals").value;
    const risk = document.getElementById("risk").value;
    props.setGoals(goals);

    // Backend...
    var url1 = "http://127.0.0.1:5000/TIAA/prediction1";
    var url2 = "http://127.0.0.1:5000/TIAA/prediction2";
    var url3 = "http://127.0.0.1:5000/TIAA/chat";

    // var go = "To plan a Europe trip from India and to get 8000 per month after retirement for 20 years";
    
    props.setBackground("brightness(0.01)");
    props.setLoad(true);
    try {
      const result1 = await fetch(url1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'age': parseInt(currAge),
          'retirement_age': parseInt(retAge),
          'goals': goals,
        }),
      }).then((res) => res.json());
      
      // const cost = result1.cost_value;
      // console.log(cost);
      // props.setGoals("To plan a Europe trip from India and to get 8000 per month after retirement for 20 years");

      
      const result2 = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'age' : parseInt(currAge),
          'savings_per_annum' : parseInt(savYear),
          'expected_savings_growth' : parseFloat(savGrowth),
          'risk_tolerance' : parseInt(risk),
          'age_of_retirement' : parseInt(retAge),
          'employment' : profession,
          'region' : region,
          'retirement_goals_cost' : parseInt(result1.cost_value),
          'current_amount' : parseInt(savings),
          'dependents' : parseInt(dependent),
        }),
      }).then((res) => res.json());

      // console.log(result2.score)


      const result3 = await fetch(url3, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'question': goals,
          'risk_score': parseFloat(result2.score)
        }),
      }).then((res) => res.json());

      // console.log(result3.message + "      " + result3.first + "      " + result3.second + "      " + result3.third);
      const arr = [];
      arr.push(result3.first.name)
      arr.push(result3.second.name)
      arr.push(result3.third.name)
      props.setNames(arr);

      const arr1 = [];
      
      arr1.push(Object.keys(result3.first.allocation))
      arr1.push(Object.keys(result3.second.allocation))
      arr1.push(Object.keys(result3.third.allocation))
      props.setKeys(arr1);

      const arr2 = [];

      arr2.push(result3.first.allocation)
      arr2.push(result3.second.allocation)
      arr2.push(result3.third.allocation)
      props.setScheme(arr2);

      // console.log(props.keys[0].length);
      // console.log(props.scheme)
      // console.log(props.names)

      props.setBackground("");
      props.setLoad(false);
      props.setReply(result3.message);
      navigate("/schemes");
    } catch (e) {
      console.log("Error in URL...");
      props.setBackground("");
      props.setLoad(false);
    }
  }

  return (
    <>
      <span className="spanImg">
        <img
          src={img1}
          alt="background"
          style={{
            width: window.innerWidth,
            height: window.innerHeight,
            filter: "brightness(0.3)",
          }}
        />
      </span>
      <div
        className="service flex absolute"
        style={{
          top: "96px",
          height: "25rem",
          marginTop: `${(window.innerHeight / 16 - 25) / 2 - 6}rem`,
          width: "66rem",
          marginBottom: `${(window.innerHeight / 16 - 25) / 2}rem`,
          overflow: "hidden",
          marginLeft: `${(window.innerWidth / 16 - 66) / 2}rem`,
          marginRight: `${(window.innerWidth / 16 - 66) / 2}rem`,
        }}
      >
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <ul
            class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
            id="fullWidthTab"
            data-tabs-toggle="#fullWidthTabContent"
            role="tablist"
          >
            <li class="w-full">
              <button
                id="1"
                data-tabs-target="#cat1"
                type="button"
                role="tab"
                aria-controls="cat1"
                aria-selected="true"
                class="w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass"
              >
                Personal Information
              </button>
            </li>
            <li class="w-full">
              <button
                id="2"
                data-tabs-target="#cat2"
                type="button"
                role="tab"
                aria-controls="cat2"
                aria-selected="false"
                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
              >
                Income Information
              </button>
            </li>
            <li class="w-full">
              <button
                id="3"
                data-tabs-target="#cat3"
                type="button"
                role="tab"
                aria-controls="cat3"
                aria-selected="false"
                class="inline-block text-lg w-full p-4 rounded-se-lg bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
              >
                Goals Information
              </button>
            </li>
          </ul>
          <div
            id="fullWidthTabContent"
            class="flex border-t border-gray-200 dark:border-gray-600"
            style={{
              opacity: "1",
              transform: `translate3d(0rem, 0px, 0px)`,
              width: `${3 * 64}rem`,
              paddingLeft: "2rem",
            }}
          >
            <div
              id="cat1"
              class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 catContainer"
              role="tabpanel"
              aria-labelledby="1"
            >
              <form>
                <div class="grid gap-6 mb-5 md:grid-cols-2">
                  <div class="mb-6">
                    <label
                      for="currAge"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white labelClass"
                    >
                      Current Age
                    </label>
                    <input
                      type="text"
                      id="currAge"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your current Age"
                      required
                    />
                  </div>
                  <div class="mb-6">
                    <div
                      className="flex text-sm"
                      style={{ justifyContent: "space-between" }}
                    >
                      <label
                        for="retAge"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white labelClass"
                      >
                        Retirement Age
                      </label>
                      <a
                        href="/checkWhy"
                        class="block mb-1 text-sm font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Why?
                      </a>
                    </div>
                    <input
                      type="text"
                      id="retAge"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your age of Retirement"
                      required
                    />
                  </div>
                </div>
                {/* <div class="flex items-start mb-6"> */}
                <div class="grid gap-6 mb-5 md:grid-cols-2">
                  <div class="mb-6">
                    <div
                      className="flex text-sm"
                      style={{ justifyContent: "space-between" }}
                    >
                      <label
                        for="profession"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white labelClass"
                      >
                        Profession
                      </label>
                      <a
                        href="/checkSignificance"
                        class="block mb-1 text-sm font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Significance?
                      </a>
                    </div>
                    <select
                      id="profession"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="Teacher" selected>
                        Teacher
                      </option>
                      <option value="Artist">Artist</option>
                      <option value="Clerk">Clerk</option>
                      <option value="SDE">SDE</option>
                      <option value="Manager">Manager</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Salesman">Salesman</option>
                      <option value="Other">Others</option>
                    </select>
                    {/* <input type="text" id="profession" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doctor" required /> */}
                  </div>

                  <div class="mb-6">
                    <label
                      for="region"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white labelClass"
                    >
                      Select a Region
                    </label>
                    <select
                      id="region"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="Tier1" selected>
                        Tier 1
                      </option>
                      <option value="Tier2">Tier 2</option>
                      <option value="Tier3">Tier 3</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div
              class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 catContainer"
              id="cat2"
              role="tabpanel"
              aria-labelledby="2"
            >
              <form>
                <div class="grid gap-6 mb-5 md:grid-cols-2">
                  <div className="mb-6">
                    <label
                      for="savings"
                      class="flex mb-2 pt-2 text-base font-bold text-gray-900 dark:text-white labelClass"
                    >
                      Total Savings
                    </label>
                    <div class="flex">
                      <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
</svg>
                      </span>
                      <input
                        type="text"
                        id="savings"
                        class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter the total savings amount you currently have"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      for="savGrowth"
                      class="flex mb-2 pt-2 text-base font-bold text-gray-900 dark:text-white labelClass"
                    >
                      Expected Savings Growth
                    </label>
                    <input
                      type="text"
                      id="savGrowth"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter the expected savings growth (0 - 1)"
                      required
                    />

                  </div>
                </div>
                <div class="grid gap-6 mb-5 md:grid-cols-2">
                  <div className="mb-6">
                    <label
                      for="savYear"
                      class="flex mb-2 text-base font-bold text-gray-900 dark:text-white labelClass"
                      style={{ marginBottom: "0.32rem" }}
                    >
                      Expected Savings per Annum
                    </label>
                    <div class="flex">
                      <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
</svg>
                      </span>
                      <input
                        type="text"
                        id="savYear"
                        class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter the amount of savings per annum"
                        required
                      />
                    </div>
                  </div>
                  <div class="mb-6">
                    <div
                      className="flex text-sm"
                      style={{ justifyContent: "space-between" }}
                    >
                      <label
                        for="dependent"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white labelClass"
                      >
                        Dependents
                      </label>
                      <a
                        href="/checkRelevance"
                        class="block mb-1 text-sm font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Relevance?
                      </a>
                    </div>
                    <input
                      type="text"
                      id="dependent"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter the number of people dependent on you"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div
              class="p-4 bg-white rounded-lg dark:bg-gray-800 catContainer"
              id="cat3"
              role="tabpanel"
              aria-labelledby="3"
              style={{ marginLeft: "0.6rem" }}
            >
              <form>
                <div className="mb-6">
                  <label
                    for="goals"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white labelClass"
                  >
                    Future Goals
                  </label>
                  <textarea
                    id="goals"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Describe your future goals here..."
                  ></textarea>
                </div>

                <div class="mb-6">
                  <div
                    className="flex text-sm"
                    style={{ justifyContent: "space-between" }}
                  >
                    <label
                      for="risk"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white labelClass"
                    >
                      Risk Tolerance
                    </label>
                    <a
                      href="/checkTolerance"
                      class="block mb-1 text-sm font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      What is Risk Tolerance?
                    </a>
                  </div>
                  <input
                    type="text"
                    id="risk"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter the level of Risk you can take (1 - 10)"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div id="arrowClassID" className="flex arrowClass">
            <button
              type="button"
              id="prev"
              className="hidden arrowButton"
              onClick={prevButtonClick}
              style={{ width: "7.5rem" }}
            >
              <img src={prevArrow} alt="Previous" />
            </button>
            <button
              type="button"
              id="next"
              className="arrowButton"
              onClick={nextButtonClick}
              style={{ width: "5.7rem" }}
            >
              <img src={nextArrow} alt="Next" />
            </button>
            <button
              id="submitForm"
              onClick={submitForm}
              class="hidden relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            >
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
          </div>
        </div>

        {/* <Form/>
      <div className='imgGoals' style={{width: window.innerWidth-880, height: window.innerHeight-96}}>
        <img src={img} alt='imgGoals'/>
      </div> */}
      </div>
    </>
  );
}
