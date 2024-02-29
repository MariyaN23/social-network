import React, {ChangeEvent} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string)=> void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    onDoubleClick =()=> {
        this.setState({editMode: true})
    }
    onBlur =()=> {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    }
    onStatusChange =(e: ChangeEvent<HTMLInputElement>)=> {
        this.setState({status: e.currentTarget.value})
    }
    render() {
        return <>
            <div>
                {!this.state.editMode && <span onDoubleClick={this.onDoubleClick}>{this.props.status || "-------"}</span>}
            </div>
            <div>
                {this.state.editMode && <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.onBlur} value={this.state.status}/>}
            </div>
        </>
    }
}