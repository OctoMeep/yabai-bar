import {run, css} from "uebersicht"

const wifiCommand = "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk -F': ' '/ SSID/ {print $2}'";
const batteryCommand = "pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%'";
const dateCommand = "date \"+%a %H:%M\"";

export const command = `echo "$(${wifiCommand}) | $(${batteryCommand})| $(${dateCommand})"`;
console.log(command);

export const refreshFrequency = 2000;

export const initialState = "Loading status...";

export const render = (desktops) => (
    <div className={outer}>
        <link rel="stylesheet" href="./style.css" />
        {desktops}
    </div>
);

const outer = css`
	display: table-cell;
    vertical-align: middle;
    overflow: hidden;

`

export const className = `
    top: 3px;
    right: 8px;
    height: 24px;
    text-align: right;
    color: #ffffff;
    font: 14px "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 700;
    display: table;
`

export const updateState = (event, previousState) => {
    let parts = event.output.split("|");
    let batteryClass = "";
    let battery = parseInt(parts[1]);
    if (battery > 90) batteryClass = "fas fa-battery-full";
    else if (battery > 70) batteryClass = "fas fa-battery-three-quarters";
    else if (battery > 40) batteryClass = "fas fa-battery-half";
    else if (battery > 20) batteryClass = "fas fa-battery-quarter";
    else batteryClass = "fas fa-battery-empty";
    let status = <div>
        <span className="fas fa-wifi">&nbsp;</span>
        <span>{parts[0]}</span>
        <span style={{color: "#19cb00"}}>|</span>
        <span>&nbsp;</span>
        <span className={batteryClass}></span>
        <span>{parts[1]}&#37;&nbsp;</span>
        <span style={{color: "#19cb00"}}>|</span>
        <span>{parts[2]}</span>
    </div>;
    return status;
}
