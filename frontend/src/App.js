import { useState, useEffect } from 'react';
import classes from './App.module.css';
import svgBadge from './svgBadge';
import SVG from 'react-inlinesvg';

// MUI Components
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MuiColorInput } from 'mui-color-input'
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';

// MUI Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';

function App() {
    const [formData, setFormData] = useState({ "shadow": true, "shadowOpacity":30, "swap": false, "label": "VISITS", "labelBGColor": "#484848", "countBGColor": "#2574EA", "labelTextColor": "#FFFFFF", "countTextColor": "#FFFFFF" });
    const [svgData, setSvgData] = useState();
    const [linkCopied, setLinkCopied] = useState(false);
    const [codeCopied, setCodeCopied] = useState(false);

    // Update the live preview of the SVG badge when any of the customization options change
    useEffect(() => {
        setSvgData(svgBadge(formData.label, formData.shadow, formData.shadowOpacity, formData.swap, formData.labelBGColor, formData.countBGColor, formData.labelTextColor, formData.countTextColor, 12345));
    }, [formData]);

    // Copy given content to the clipboard
    const copyToClipboard = (content) => {
        const el = document.createElement('textarea');
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    // Create the badge link with current customizations
    const createLink = () => {
        // Create a random 20 character long string for the uniqueID
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        let randomStr = "";
        for (let i = 0; i < 20; i++)
            randomStr += charset[Math.floor(Math.random() * charset.length)];

        // HTML encode space to %20 and stuffs like that
        var textContent = encodeURI(formData.label)

        // Create and send the link
        const link = `https://visits.dashroshan.com/${randomStr}?label=${textContent}&shadow=${(formData.shadow) ? 1 : 0}&shadowOpacity=${formData.shadowOpacity}&swap=${(formData.swap) ? 1 : 0}&labelBGColor=${formData.labelBGColor.substring(1)}&countBGColor=${formData.countBGColor.substring(1)}&labelTextColor=${formData.labelTextColor.substring(1)}&countTextColor=${formData.countTextColor.substring(1)}`;
        return link;
    }

    // Create the HTML embed code for the badge
    const createCode = () => {
        let imgLink = createLink();
        return `<a href="https://visits.dashroshan.com"><img src="${imgLink}" alt="Visits Counter Badge" height=30px/></a>`
    }

    return (
        <div className={classes.app}>
            {/* SVG badge preview */}
            <SVG
                className={classes.badge}
                src={svgData}
                title="React"
            />

            {/* Buttons to copy image link and html embed code */}
            <div className={classes.copyButtons}>
                <Tooltip title="Copy direct link to the svg badge image" arrow>
                    <Button variant="contained" disableElevation startIcon={(linkCopied) ? <DoneIcon /> : <ContentCopyIcon />} onClick={() => {
                        setLinkCopied(true);
                        copyToClipboard(createLink());
                        setTimeout(() => {
                            setLinkCopied(false)
                        }, 2000);
                    }}>
                        {(linkCopied) ? "Link copied" : "Image link"}
                    </Button>
                </Tooltip>
                <Tooltip title="Copy embed code to use in HTML and Markdown files" arrow>
                    <Button variant="contained" disableElevation startIcon={(codeCopied) ? <DoneIcon /> : <ContentCopyIcon />} onClick={() => {
                        setCodeCopied(true);
                        copyToClipboard(createCode());
                        setTimeout(() => {
                            setCodeCopied(false)
                        }, 2000);
                    }}>
                        {(codeCopied) ? "Code copied" : "Embed code"}
                    </Button>
                </Tooltip>
            </div>

            {/* Customizations card */}
            <div className={classes.card}>
                <div className={classes.customize}>Customizations</div>
                <TextField
                    className={classes.customizeInput}
                    id="outlined"
                    label="Text on the label"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, "label": e.target.value })}
                />
                <MuiColorInput className={classes.customizeInput} isAlphaHidden={true} format='hex' value={formData.labelBGColor} onChange={(c) => setFormData({ ...formData, "labelBGColor": c })} label={`${formData.swap ? 'Visits count' : 'Label'} background color`} />
                <MuiColorInput className={classes.customizeInput} isAlphaHidden={true} format='hex' value={formData.countBGColor} onChange={(c) => setFormData({ ...formData, "countBGColor": c })} label={`${!formData.swap ? 'Visits count' : 'Label'} background color`} />
                <MuiColorInput className={classes.customizeInput} isAlphaHidden={true} format='hex' value={formData.labelTextColor} onChange={(c) => setFormData({ ...formData, "labelTextColor": c })} label={`${formData.swap ? 'Visits count' : 'Label'} text color`} />
                <MuiColorInput className={classes.customizeInput} isAlphaHidden={true} format='hex' value={formData.countTextColor} onChange={(c) => setFormData({ ...formData, "countTextColor": c })} label={`${!formData.swap ? 'Visits count' : 'Label'} text color`} />
                <div className={classes.opacityWrap}>
                    <FormControlLabel control={<Switch checked={formData.shadow} onChange={(e) => setFormData({ ...formData, "shadow": !formData.shadow })} />} label={formData.shadow ? "Text shadow, opacity: " : "Text shadow"} />
                    {formData.shadow ? <Slider className={classes.opacitySlider} defaultValue={30} valueLabelDisplay="auto" min={5} max={100} onChange={(c) => setFormData({ ...formData, "shadowOpacity": c.target.value })}/> : null}
                </div>
                <FormControlLabel className={classes.customizeInputSwitch} control={<Switch checked={formData.swap} onChange={(e) => setFormData({ ...formData, "swap": !formData.swap })} />} label="Swap label and visits count" />
            </div>

            {/* Footer with link to the GitHub repo and author site*/}
            <div className={classes.bottomLinks}>
                <Button target="_blank" href="https://github.com/roshan1337d/visits-counter" variant="contained" disableElevation startIcon={<GitHubIcon />}>
                    SOURCE CODE
                </Button>
                <Button target="_blank" href="https://dashroshan.com" variant="outlined" disableElevation startIcon={<PersonIcon />}>
                    AUTHOR
                </Button>
            </div>
        </div >
    );
}

export default App;
