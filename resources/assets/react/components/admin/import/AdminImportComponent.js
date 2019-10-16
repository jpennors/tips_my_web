import React, { Component } from 'react';
import XLSX, { stream } from 'xlsx';
import {ajaxGet, ajaxPost} from "../../../utils/Ajax";


import {
    Button,
    Divider,
    Form,
    Grid,
    Header,
    Icon,
    Input,
    Image,
    Label,
    Menu,
    Message,
    Table,
    Tab
  } from "semantic-ui-react";

class AdminImportComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file : null,
            type : 'resources',
            errors : [],
            success : null,
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.checkResourcesValidity = this.checkResourcesValidity.bind(this)
        this.checkTagsValidity = this.checkTagsValidity.bind(this)

    }

    handleChangeSelect(event){
        this.setState({
            type:  event.target.value
        })
    }

    handleChange(event){
        const files = event.target.files;
        console.log(files)
        if (files && files[0] && files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            this.setState({ file: files[0], errors: [], succeess: null, file_name: files[0].name });
            console.log("ici")
        }

    }

    handleFile() {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */

            if (this.state.type == "tags") {
                this.checkTagsValidity(data)
            } else if (this.state.type == "resources"){
                this.checkResourcesValidity(data)
            }
        };
        if(this.state.file){
            if (rABS) {
            reader.readAsBinaryString(this.state.file);
            } else {
            reader.readAsArrayBuffer(this.state.file);
            };
        } else {
            this.setState({ errors : ["Votre fichier n'est pas du format .xlsx"]})
        }
    }

    checkTagsValidity(data){
        var errors = []

        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            if (!element.name) {
                errors.push("Element n°" + index+1 + ": Nom requis.")
            }
        }

        this.setState({errors : errors})

        if (errors.length == 0) {
            this.importData(data)
        }
    }

    checkResourcesValidity(data){
        var errors = []

        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            if (!element.name) {
                errors.push("Element n°" + index+1 + ": Nom requis.")
            }
            if(!element.url){
                errors.push("Element n°" + index+1 + ": URL requis.")
            }
            if(!element.score){
                errors.push("Element n°" + index+1 + ": Score requis.")
            } else {
                if(!Number.isInteger(element.score)){
                    errors.push("Element n°" + index+1 + ": Le score doit être un entier.")
                }
            }
            if(!element.language){
                errors.push("Element n°" + index+1 + ": Language requis.")
            }
        }

        this.setState({errors : errors})

        if (errors.length == 0) {
            this.importData(data)
        }
    }

    importData(data){
        ajaxPost('import/' + this.state.type, {data: data}).then(() => {
            this.setState({success: "Données importées avec succès"})
        })
        .catch((errors) => {
            console.log(errors)
        });
    }


    render() {
        const {errors, success} = this.state;

        return (

            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Grid.Row>
                    <Header dividing size="huge" as="h2">
                        Import de ressources
                    </Header>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field inline>
                                <label>Nom</label>
                                <input
                                    id="input"
                                    type="file"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Field>
                            <Form.Field inline>
                                <label>Type</label>
                                <select
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.handleChangeSelect}
                                >
                                    <option value="resources" defaultValue>Ressources</option>
                                    <option value="tags">Tags</option>
                                </select>


                            </Form.Field>
                        </Form.Group>
                        <Divider fitted/>
                        <Button color='blue' type='submit' onClick={this.handleFile}>Submit</Button>
                    </Form>

                    {
                        (errors.length>0)? (
                            <Message
                                error
                                header='Des erreurs ont été trouvées dans le fichier Excel'
                                list={errors}
                            />
                        ) : ('')
                    }
                    {
                        (success)? (
                            <Message
                                positive
                                header={success}
                            />
                        ) : ('')
                    }

                </Grid.Row>
            </Grid.Column>
        )
    }
}

export default AdminImportComponent;
