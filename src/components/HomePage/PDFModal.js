import React, { Component } from "react";


export default class PDFModal extends Component {
    constructor(props) {
        super(props)
    };

    render() {
      return (
          <div class="modal fade" id="myModal" tabindex="-1" role="dialog" >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" dataDismiss="modal" >×</button>
                                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                            </div>
                            <div class="modal-body">
                                <div style={{textAlign: 'center'}}>
                                    <iframe src="http://docs.google.com/gview?url=http://www.pdf995.com/samples/pdf.pdf&embedded=true"
                                    style={{width:'500px', height:'500px'}} frameborder="0"></iframe>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" dataDismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
      )}
    }