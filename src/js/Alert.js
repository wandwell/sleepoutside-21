export default class Alert {
  constructor(alertUrl) {
    this.alertUrl = alertUrl;
  }
  async loadAlerts() {
    try {
      const response = await fetch("/json/alert.json");

      if (!response.ok)
        throw new Error(`Failed to load alerts. Status: ${response.status}`);

      const alerts = await response.json();

      this.renderAlerts(alerts);
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }

  renderAlerts(alerts) {
    console.log(alerts);
    if (alerts.length === 0) return;

    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    alerts.forEach((alert) => {
      const alertElement = document.createElement("p");
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color;
      alertElement.style.padding = "10px";
      alertElement.style.margin = "5px 0";
      alertSection.appendChild(alertElement);
    });

    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(alertSection);
    }
  }
}
