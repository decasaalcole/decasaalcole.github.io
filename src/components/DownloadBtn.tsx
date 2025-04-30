import './DownloadBtn.css';
import downloadIcon from '../assets/icons/download.svg';
export function DownloadBtn() {
    return (
        <button onClick={() => {}} className="download-btn">
            <img src={downloadIcon} alt="Download XLSX" />
            <p>Download XLSX</p>
        </button>
    )
}