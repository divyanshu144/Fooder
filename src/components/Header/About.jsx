//import User from "./User";
import React from "react";
import UserClass from "./UserClass";

class About extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    componentDidMount() {
       // console.log("Parent Component Did Mount")
    }


    render() {
       // console.log('parent render')
        return (
            <div className="p-4 m-4 items-center">
                <h1>About Class Component</h1>
                <h2>This is Food App</h2>
                <UserClass name={"First"}/>
                {/* <UserClass name={"Second"}/> */}
            </div>
        )
    }

}
/*
- Parent Constructor
- Parent Render

    <SINGLE BATCH of RENDER PHASE of all the child is formed and loaded together>
    - First Constructor
    - First Render

    - Second Constructor
    - Second Render

    < UPDATED - IN SINGLE BATCH>
    - First Component Did Mount
    - Second Component Did Mount

- Parent Component Did Mount

*/

// const About = () => {
//     return (
//         <div>
//             <h1>About</h1>
//             <h2>This is Food App</h2>
//             <UserClass name={"Divyanshu Charak Class"}/>
//         </div>
//     )

// }

export default About;