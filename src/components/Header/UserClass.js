// const User = () => {
//     return (
//         <div className="user-card">
//             <h2>Name: Divyanshu</h2>
//             <h3>Location: Jammu</h3>
//             <h4>Contact: 7889753910</h4>

//         </div>
//     )
// }

// export default User;

import React from "react";



class UserClass extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
           userInfo:{
                name: "Dummy",
                location: "Default"
           }
        };

       // console.log(this.props.name + "Child constructor")
    }

    async componentDidMount() {
        //console.log(this.props.name + "Child Component Did Mount")

        const data = await fetch("https://api.github.com/users/divyanshu144");

        const json = await data.json();

        this.setState({
            userInfo: json,
        });

    }

    render() {
        //console.log(this.props.name + "Child render")

        const { name, location, avatar_url} = this.state.userInfo;
        return (
                    <div className="items-center">
                        <img className="rounded-2xl" src={avatar_url} alt="Divyanshu"/>
                        <h2>Name: {name}</h2>
                        <h3>Location: {location}</h3>
                        <h4>Contact: 7889753910</h4>
            
                    </div>
                )
    }
}

export default UserClass;