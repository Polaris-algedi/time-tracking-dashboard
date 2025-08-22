import "./style.css";

async function getData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getData("data.json");
  console.log(data);
  updateActivityTime(data);

  /**
   * Updates the UI with the given data
   * @param {Array<{current: number, previous: number}>} data - The data to update the UI with
   */
  function updateActivityTime(data) {
    const activityTimeList = document.querySelectorAll(".activity-time");
    console.log(activityTimeList);

    switch ("weekly") {
      case "daily":
        const dailyData = data.map((item) => ({
          current: item.timeframes.daily.current,
          previous: item.timeframes.daily.previous,
        }));
        // Update the UI with dailyData
        dailyData.forEach((item, index) => {
          const activityTime = activityTimeList[index];
          if (activityTime) {
            activityTime.firstElementChild.textContent = item.current + "hrs";
            activityTime.lastElementChild.textContent =
              "Last Day - " + item.previous + "hrs";
          }
        });
        break;
      case "weekly":
        const weeklyData = data.map((item) => {
          return {
            current: item.timeframes.weekly.current,
            previous: item.timeframes.weekly.previous,
          };
        });
        // Update the UI with weeklyData
        weeklyData.forEach((item, index) => {
          const activityTime = activityTimeList[index];
          if (activityTime) {
            activityTime.firstElementChild.textContent = item.current + "hrs";
            activityTime.lastElementChild.textContent =
              "Last Week - " + item.previous + "hrs";
          }
        });
        break;
      case "monthly":
        const monthlyData = [];
        data.forEach((element) => {
          monthlyData.push({
            current: element.timeframes.monthly.current,
            previous: element.timeframes.monthly.previous,
          });
        });
        // Update the UI with monthlyData
        monthlyData.forEach((item, index) => {
          const activityTime = activityTimeList[index];
          if (activityTime) {
            activityTime.firstElementChild.textContent = item.current + "hrs";
            activityTime.lastElementChild.textContent =
              "Last Month - " + item.previous + "hrs";
          }
        });
        break;
      default:
        console.log("Unknown timeframe");
        break;
    }
  }

  document.querySelector(".timeframe-list").addEventListener("click", (e) => {
    const timeframe = e.target;
    console.log(timeframe);

    if (timeframe.tagName === "A") {
      const timeframeList = document.querySelectorAll(".timeframe-list li a");
      timeframeList.forEach((item) => {
        item.classList.remove("active");
      });
      timeframe.classList.add("active");
      updateActivityTime(data);
    }
  });
});
