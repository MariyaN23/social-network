import React, {ChangeEvent} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string)=> void
    profileId: string
    authId: string | null
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    onDoubleClick =()=> {
        if (this.props.profileId === this.props.authId) {
            this.setState({editMode: true})
        }
    }
    onBlur =()=> {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    }
    onStatusChange =(e: ChangeEvent<HTMLInputElement>)=> {
        this.setState({status: e.currentTarget.value})
    }
    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
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