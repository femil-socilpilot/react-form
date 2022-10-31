import axios from 'axios'
import React, { Component } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


export class InputElm extends Component {
    // constructor(props) {
    //     super(props)
    // }

    componentWillReceiveProps() {
        // console.log('ss');
    }

    render() {
        // console.log(this.props);
        const { type, name, placeholder, errormessage, onChange, onBlur } = this.props
        return (
            <div>
                <input autoComplete='off' type={type} name={name} placeholder={placeholder} onChange={onChange} onBlur={onBlur} {...this.props} />
                <span>{errormessage}</span>
            </div>
        )
    }
}


export class SignIn extends Component {
    constructor(props) {
        super(props)
        this.submit_btn = React.createRef()
        this.state = {
            formData: {
                email: 'aa@gmail.co',
                password: 'Abcd1234!@',
            },
            messages: {
                email: 'Only gmail or yahoo with .co or .com',
                password: 'Minimum eight characters, at least one letter, one number and one special character',
            },
            errors: {},
            user: null
        }
    }

    componentDidMount() {
        // this.first_name_ref.current.focus()
    }

    componentDidUpdate(_, prevState) {
        [...document.querySelectorAll('[required]')].map(input => {
            if (this.state.formData[input.name] && !this.state.errors[input.name]) {
                this.submit_btn.current.disabled = false
            } else {
                this.submit_btn.current.disabled = true
            }
        })
    }

    isValueValid = (name, value, pattern) => {
        if (!RegExp(pattern).test(value)) {
            this.setState(state => {
                state.errors[name] = state.messages[name]
                return state
            })
            return false
        } else {
            this.setState(state => {
                state.errors[name] = null
                return state
            })
            return true
        }
    }

    handleInputChange = (e) => {
        const { name, value, pattern } = e.target
        const isvalid = this.isValueValid(name, value, pattern)

        if (name === 'confirm_password' && this.state.formData.password !== value) {
            this.setState(state => {
                state.errors[name] = state.messages[name]
                return state
            })
        } else if (name === 'confirm_password' && this.state.formData.password === value) {
            this.setState(state => {
                state.errors[name] = null
                return state
            })
        }
        if (name === 'password') {
            this.setState(state => {
                state.formData.confirm_password = ''
                return state
            })
        }

        console.log(this.state.formData);
        this.setState((state) => {
            state.formData[name] = value.trim()
            return state
        })

    }


    handleInputBlur = (e) => {
        const { name, value, pattern, required, ...arg } = e.target

        if (!value && required) {
            // console.log('null val');
            this.setState(state => {

                state.errors[name] = 'required field'
                return state
            })
            return false
        }
        console.log(name, this.state.formData.password === value);
        if (name === 'confirm_password' && this.state.formData.password !== value) {
            this.setState(state => {
                state.errors[name] = state.messages[name]
                return state
            })
        } else if (name === 'confirm_password' && this.state.formData.password === value) {
            this.setState(state => {
                state.errors[name] = null
                return state
            })
        }
    }

    handleFormSubmit = async (e) => {
        const { email, password } = this.state.formData
        try {
            const profiles = await (await axios.get('http://localhost:3001/profiles')).data
            const isUserExists = profiles.find(profile => profile.email = email)
            if (!isUserExists) {
                this.setState(state => {
                    state.user = true
                    return state
                })
                throw new Error('User not found.')
            }
            localStorage.setItem('profile', JSON.stringify(isUserExists))
            this.setState(state => {
                state.user = true
                return state
            })
        }
        catch (err) {
            alert(err)
        }
    }


    render() {
        const { formData, errors, user } = this.state
        return (
            <div className='formWrapper'>
                {user === true && (
                    <Navigate to="/" replace={true} />
                )}
                {user === false && (
                    <Navigate to="/signup" replace={true} />
                )}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.handleFormSubmit(e)
                }}>

                    <InputElm
                        type={'text'}
                        name="email"
                        value={formData.email}
                        placeholder='Email'
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        errormessage={errors['email']}
                        pattern='^[a-z0-9._]+(@gmail|@yahoo)\.([+co]{2}|[+com]{3})$'
                        required
                    />
                    <InputElm
                        type={'text'}
                        name="password"
                        value={formData.password}
                        placeholder='Password'
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        errormessage={errors['password']}
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                        required
                    />
                    <button type='submit' ref={this.submit_btn} disabled>Submit</button>
                </form>
            </div >
        )
    }
}

export default SignIn


// ✅ blur, ✅ chnageEvent,✅ RegEx,✅ DisableBTn



// signin, signup, home redirect, post per user, details post with comments, add comment

//