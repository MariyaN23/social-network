import React from 'react';

type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false
    }
    onDoubleClick =()=> {
        this.setState({editMode: true})
    }
    onBlur =()=> {
        this.setState({editMode: false})
    }
    render() {
        return <>
            <div>
                {!this.state.editMode && <span onDoubleClick={this.onDoubleClick}>{this.props.status}</span>}
            </div>
            <div>
                {this.state.editMode && <input  autoFocus={true} onBlur={this.onBlur} value={this.props.status}/>}
            </div>
        </>
    }
}