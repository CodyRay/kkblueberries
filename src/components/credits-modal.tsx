'use client'

import { useState } from 'react'

export default function CreditsModal({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <span className={className}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
      >
        Credits
      </a>

      {open && (
        <div
          className="modal fade in"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setOpen(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true">&times;</span>
                  <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title">Credits</h4>
              </div>
              <div className="modal-body">
                <p>
                  Thank you to the{' '}
                  <a
                    href="https://thenounproject.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Noun project
                  </a>{' '}
                  and to the Open Source projects used on this website
                </p>
                <p>
                  Noun project icons are used under the Creative Commons license:
                </p>
                <ul>
                  <li>
                    (background) blueberries by anbileru adaleru from the Noun Project
                  </li>
                  <li>
                    <span className="icon-blueberries" /> blueberries by b farias from the Noun Project
                  </li>
                  <li>
                    <span className="icon-leaves" /> leaves by Aida De La Fuente from the Noun Project
                  </li>
                  <li>
                    <span className="icon-single-leaf" /> leaf by Mark Caron from the Noun Project
                  </li>
                  <li>(favicon) blueberries by icon 54 from the Noun Project</li>
                </ul>
                <p>
                  Also see{' '}
                  <a
                    href="https://github.com/codyray/kkblueberries"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    codyray/kkblueberries
                  </a>{' '}
                  for the source of the website
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  )
}
