import logomark from '../assets/logomark.svg'
import { Form, NavLink } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/16/solid'

const Nav = ({ userName }) => {
    return (
        <nav>
            <NavLink to='/' aria-label='go to home'>
                <img src={logomark} alt="" height={30} />
                <span>Budgeter</span>
            </NavLink>

            {
                userName && (
                    <Form
                        method='post'
                        action='/logout'
                        onSubmit={(e) => {
                            if (!confirm('delete user and all data?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <button type='submit' className='btn btn--warning'>
                            <span>delete user</span>
                            <TrashIcon width={20} />
                        </button>
                    </Form>
                )
            }

        </nav>
    )
}

export default Nav

