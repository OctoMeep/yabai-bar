import {run, css} from "uebersicht"

//export const command = "echo $(x=$(/usr/local/bin/chunkc tiling::query -d id);echo $(/usr/local/bin/chunkc tiling::query -D $(/usr/local/bin/chunkc tiling::query -m id))\",$x\")"
export const command = "/usr/local/bin/yabai -m query --spaces";

export const refreshFrequency = 1000;

export const initialState = "Loading desktops...";

export const render = (icons) => (
    <div className={outer}>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
        {icons}
    </div>
);

const outer = css`
	display: table-cell;
    vertical-align: middle;
    overflow: hidden;

`

const active = css`
	border-bottom: 2px solid #19cb00;
`

export const className = `
    top: 4px;
    left: 8px;
    height: 24px;
    color: #ffffff;
    font: 14px "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 700;
    display: table;
`

const parseState = (event) => {
	let data = JSON.parse(event.output);
	let spaces = [];
	let current = 1;
	data.forEach((space, index) => {
		spaces.push(index + 1);
		if (space.focused) current = index + 1;
	});
	return spaces.join(' ') + ',' + current;
}

export const updateState = (event, previousState) => {
    let icons = [];
	
    //let parts = event.output.split(',');
	let parts = parseState(event).split(',');

    let workspaces = parts[0].split(' ');
    let current = parts[1].charAt(0);
    workspaces.forEach(workspace => {
        let iconClass = "";
        switch (workspace) {
            case "1": iconClass = "fas fa-folder"; break;
            case "2": iconClass = "fab fa-firefox"; break;
            case "3": iconClass = "fab fa-discord"; break;
            case "4": iconClass = "fas fa-envelope"; break;
            case "7": iconClass = "fab fa-whatsapp"; break;
            case "8": iconClass = "fab fa-spotify"; break;
            default: iconClass = "fas fa-terminal";
        }
        let isActive = workspace.toString() == current;
        icons.push(<div key={workspace} style={{float: "left"}}>
            <span className={"icon " + (isActive ? active : "") + " " + iconClass}></span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>);
    });
    return icons;
}
