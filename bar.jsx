import {css} from "uebersicht"

export const command = "/usr/bin/osascript -e 'tell application \"System Events\"' -e 'set frontApp to name of first application process whose frontmost is true' -e 'end tell'"

export const refreshFrequency = 2000;

export const render = ({output}) => (
    <div className={outer}>
        {output}
    </div>
);

const outer = css`
	display: table-cell;
    vertical-align: middle;
    overflow: hidden;

`

export const className = `
    background-color: #2d2d2d;
    width: 99.4%;
    top: 5px;
    right: 5px;
    left: 4px;
    height: 24px;
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.40);
    border-radius: 5px;
    z-index: -1;
    text-align: center;
    color: #ffffff;
    font: 14px "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 700;
    display: table;
`
