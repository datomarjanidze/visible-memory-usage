"use strict";
const chalk = {
    green: (text) => "\x1b[32m" + text + "\x1b[0m",
    yellow: (text) => "\x1b[33m" + text + "\x1b[0m",
    red: (text) => "\x1b[31m" + text + "\x1b[0m",
};
class VisibleMemoryUsage {
    maxOldSpaceSizeInMB;
    memoryUsageInMB;
    memoryType;
    fps;
    intervalId;
    constructor(fps = 60, memoryType = "rss") {
        if (fps < 1 || fps > 60)
            throw new Error(`invalid argument value "${fps}" for "fps"`);
        else
            this.fps = fps;
        if (!RegExp("^(rss|heapTotal|heapUsed|external|arrayBuffers)$").test(memoryType))
            throw new Error(`invalid argument value "${memoryType}" for "memoryType"`);
        else
            this.memoryType = memoryType;
    }
    showMemoryUsage() {
        if (!this.intervalId) {
            this.maxOldSpaceSizeInMB = this.getMaxOldSpaceSizeArgFromCli();
            this.startPrinting(this.fps);
            return () => this.hideMemoryUsage();
        }
        return;
    }
    hideMemoryUsage() {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
        this.printOnSingleLine("");
    }
    getMaxOldSpaceSizeArgFromCli() {
        let maxOldSpaceSizeArg = process.execArgv.find((argv) => RegExp("^--max-old-space-size=\\d+$").exec(argv));
        if (maxOldSpaceSizeArg)
            return Number(maxOldSpaceSizeArg.split("=")[1]);
        else
            throw new Error("`--max-old-space-size` argument was not provided");
    }
    getMemoryUsage(memoryType) {
        const memoryUsage = process.memoryUsage();
        return memoryUsage[memoryType] / 1e6;
    }
    startPrinting(fps) {
        this.intervalId = setInterval(() => {
            this.memoryUsageInMB = this.getMemoryUsage(this.memoryType);
            const memoryUsageInMBString = String(Math.round(this.memoryUsageInMB));
            const memoryColorSegmentLengthInMB = this.maxOldSpaceSizeInMB / Object.keys(chalk).length;
            const columnLengthForEachSegment = Math.floor((process.stdout.columns - memoryUsageInMBString.length) /
                Object.keys(chalk).length);
            let greenBars = this.generateBars(memoryColorSegmentLengthInMB, columnLengthForEachSegment, 0, memoryColorSegmentLengthInMB, "green");
            let yellowBars = this.generateBars(memoryColorSegmentLengthInMB, columnLengthForEachSegment, memoryColorSegmentLengthInMB, memoryColorSegmentLengthInMB * 2, "yellow");
            let redBars = this.generateBars(memoryColorSegmentLengthInMB, columnLengthForEachSegment, memoryColorSegmentLengthInMB * 2, memoryColorSegmentLengthInMB * 3, "red");
            this.printOnSingleLine(greenBars + yellowBars + redBars + memoryUsageInMBString);
        }, 1e3 / fps);
    }
    generateBars(memoryColorSegmentLengthInMB, columnLengthForEachSegment, lowerMemoryBoundInMB, upperMemoryBoundInMB, color) {
        let coloredBarsLength = 0;
        if (lowerMemoryBoundInMB > this.memoryUsageInMB)
            coloredBarsLength = 0;
        if (lowerMemoryBoundInMB <= this.memoryUsageInMB)
            coloredBarsLength = Math.round(((this.memoryUsageInMB - lowerMemoryBoundInMB) /
                memoryColorSegmentLengthInMB) *
                columnLengthForEachSegment);
        if (this.memoryUsageInMB > upperMemoryBoundInMB)
            coloredBarsLength = columnLengthForEachSegment;
        let whiteBarsLength = columnLengthForEachSegment - coloredBarsLength;
        whiteBarsLength = whiteBarsLength > 0 ? whiteBarsLength : 0;
        let coloredBars = "";
        if (coloredBarsLength > 0)
            switch (color) {
                case "green":
                    coloredBars = chalk.green("|".repeat(coloredBarsLength));
                    break;
                case "yellow":
                    coloredBars = chalk.yellow("|".repeat(coloredBarsLength));
                    break;
                case "red":
                    coloredBars = chalk.red("|".repeat(coloredBarsLength));
            }
        return `${coloredBars}${"|".repeat(whiteBarsLength)}`;
    }
    printOnSingleLine(message) {
        process.stdout.clearLine(-1);
        process.stdout.cursorTo(-1);
        process.stdout.write(message);
    }
}
module.exports = { VisibleMemoryUsage };
