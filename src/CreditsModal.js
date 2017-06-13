import React, { Component } from 'react';
import Modal from 'react-modal';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
  }

  closeModal() {
    this.setState({ modal: false });
  }

  render() {
    return (
      <div {...this.props}>
        <a href="https://github.com/haroldhues/kkblueberries" onClick={((e) => {
          e.preventDefault();
          this.setState({ modal: true })
        })}>Credits</a>
        <Modal
          ref="credits"
          className="Modal__Bootstrap modal-dialog"
          id="credits"
          isOpen={this.state.modal}
          onRequestClose={this.closeModal.bind(this)}
          contentLabel="Credits">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal.bind(this)}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Credits</h4>
            </div>
            <div className="modal-body">
              <p>Thank you to the <a href="https://thenounproject.com/" target="_blank" rel="noopener noreferrer">Noun project</a> and to the Open Source projects used on this website</p>

              <p>Noun project icons are used under the Creative Commons license:</p>

              <ul>
                <li>(background) blueberries by anbileru adaleru from the Noun Project</li>
                <li><span className="icon-blueberries" /> blueberries by b farias from the Noun Project</li>
                <li><span className="icon-leaves" /> leaves by Aida De La Fuente from the Noun Project</li>
                <li><span className="icon-single-leaf" /> leaf by Mark Caron from the Noun Project</li>
                <li>(favicon) blueberries by icon 54 from the Noun Project</li>
              </ul>

              <p>Also see <a href="https://github.com/haroldhues/kkblueberries" target="_blank" rel="noopener noreferrer">haroldhues/kkblueberries</a> for the source of the website</p>
            </div>
          </div>
        </Modal>
      </div >
    );
  }
}

export default Photos;