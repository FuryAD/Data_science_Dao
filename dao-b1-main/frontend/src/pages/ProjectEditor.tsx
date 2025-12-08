import React, { useRef, useState, useEffect } from 'react'
import { GrantSkeleton } from '../components/Skeletons'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'

type ExportedFile = { name: string; blob: Blob }

export default function ProjectEditor() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [projectName, setProjectName] = useState('DAO_Proposal_01')
  const [exportsList, setExportsList] = useState<ExportedFile[]>([])
  const [summary, setSummary] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        // diagrams.net sends exported data under event='export' or action
        if (data?.event === 'export' && data?.data) {
          // data.data may be a data URL
          const dataUrl = data.data as string
          downloadDataUrl(dataUrl, `${projectName}-diagram.png`)
        } else if (data?.action === 'export' && data?.xml) {
          // fallback handling
          // ignore
        } else if (data?.base64) {
          const base64 = data.base64 as string
          const dataUrl = `data:image/png;base64,${base64}`
          downloadDataUrl(dataUrl, `${projectName}-diagram.png`)
        }
      } catch (err) {
        // ignore
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [projectName])

  function dataUrlToBlob(dataUrl: string) {
    const parts = dataUrl.split(',')
    const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png'
    const bstr = atob(parts[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) u8arr[n] = bstr.charCodeAt(n)
    return new Blob([u8arr], { type: mime })
  }

  function downloadDataUrl(dataUrl: string, filename: string) {
    const blob = dataUrlToBlob(dataUrl)
    setExportsList((s) => [...s, { name: filename, blob }])
    saveAs(blob, filename)
  }

  const requestExport = () => {
    // diagrams.net expects a JSON postMessage with action 'export'
    const msg = JSON.stringify({ action: 'export', format: 'png', xml: true })
    iframeRef.current?.contentWindow?.postMessage(msg, '*')
  }

  const exportPDF = async () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    doc.setFontSize(12)
    doc.text(projectName, 40, 40)
    doc.text('One-page summary', 40, 70)
    doc.setFontSize(10)
    const lines = doc.splitTextToSize(summary || 'No summary provided.', 500)
    doc.text(lines, 40, 100)
    const pdfBlob = doc.output('blob')
    setExportsList((s) => [...s, { name: `${projectName}-summary.pdf`, blob: pdfBlob }])
    saveAs(pdfBlob, `${projectName}-summary.pdf`)
  }

  const downloadAllZip = async () => {
    const zip = new JSZip()
    exportsList.forEach((f) => zip.file(f.name, f.blob))
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, `${projectName}-submission.zip`)
  }

  const openDiagramsNet = () => {
    const url = 'https://app.diagrams.net/?embed=1&ui=min'
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ action: 'init' }), '*')
    // allow both open in new tab and embed
    // open in new tab as fallback
    // window.open(url, '_blank')
  }

  return (
    <div>
      <h2>Proposal Architecture Editor — {projectName}</h2>
      <div className="card">
        <label>Project name</label>
        <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <div className="actions">
          <button onClick={() => window.open('https://app.diagrams.net/?embed=1&ui=min', '_blank')}>Open in diagrams.net (new tab)</button>
          <button onClick={requestExport}>Export PNG (from editor)</button>
          <button onClick={exportPDF}>Export Summary as PDF</button>
          <button onClick={downloadAllZip} disabled={exportsList.length === 0}>Download ZIP</button>
        </div>
      </div>

      {loading ? (
        <GrantSkeleton />
      ) : (
        <div className="card" style={{ height: '600px' }}>
          <iframe
            ref={iframeRef}
            title="Diagram Editor"
            src="https://app.diagrams.net/?embed=1&ui=min"
            style={{ width: '100%', height: '100%', border: '0', borderRadius: 8 }}
          />
          <small className="muted">Tip: use File → Export as PNG/PDF inside the editor. Or click <strong>Export PNG</strong> above to request an export programmatically.</small>
        </div>
      )}

      <div className="card">
        <h3>One-page Summary</h3>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={8} />
        <div className="actions">
          <button onClick={exportPDF}>Save Summary as PDF</button>
        </div>
      </div>

      <div className="card">
        <h3>Exports</h3>
        {exportsList.length === 0 && <div className="empty">No exports yet</div>}
        <div className="list">
          {exportsList.map((f, i) => (
            <div key={i} className="card">
              <p>{f.name}</p>
              <div className="actions">
                <button onClick={() => saveAs(f.blob, f.name)}>Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
