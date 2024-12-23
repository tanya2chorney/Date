class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerElement = document.querySelector(selector);
    this.targetDate = targetDate;
    this.daysElement = this.timerElement.querySelector('[data-value="days"]');
    this.hoursElement = this.timerElement.querySelector('[data-value="hours"]');
    this.minsElement = this.timerElement.querySelector('[data-value="mins"]');
    this.secsElement = this.timerElement.querySelector('[data-value="secs"]');

    this.start();
  }

  start() {
    this.updateTimer();
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    const currentTime = new Date();
    const timeDifference = this.targetDate - currentTime;

    if (timeDifference <= 0) {
      this.stop();
      this.render(0, 0, 0, 0);
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((timeDifference % (1000 * 60)) / 1000);

    this.render(days, hours, mins, secs);
  }

  render(days, hours, mins, secs) {
    this.daysElement.textContent = this.pad(days);
    this.hoursElement.textContent = this.pad(hours);
    this.minsElement.textContent = this.pad(mins);
    this.secsElement.textContent = this.pad(secs);
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2025"),
});
