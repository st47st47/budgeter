import { Form } from "react-router-dom"
import { UserPlusIcon } from "@heroicons/react/16/solid"
import illustration from '../assets/illustration.jpg'

const Intro = () => {
    return (
        <div className="intro">
            <div>
                <h1>Take control of <span className="accent">your money.</span></h1>
                <p>Personal budgeting is the secret  to financial freedom. Start your jorney today.</p>

                <Form method="post">
                    <input type="text" name="userName" required placeholder="What is your name?" aria-label='your name' autoComplete="given-name" />
                    <input type="hidden" name="_action" value='newUser' />
                    <button type="submit" className="btn btn--dark">
                        <span>Create account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="person with money" width={600} />
        </div >
    )
}

export default Intro

