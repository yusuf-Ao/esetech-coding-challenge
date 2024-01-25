import { default as React, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authSignup } from '../../state/actions/auth.actions';
import { toast } from 'react-toastify';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, updateFormData] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { email: '', password: '', showPassword: false }
  );

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password)
      return toast.error('All fields are required');
    dispatch(authSignup({ formData, toast, navigate }));
  };

  return (
    <div className='font-poppins h-screen grid place-content-center'>
      <div className='flex flex-col justify-center items-center px-4 md:px-0 md:w-[450px]'>
        <div className='my-4 space-y-4 flex flex-col justify-center items-center'>
          <h1 className='text-[16px] md:text-[26px]'>
            Try Esetech Collaborative note &nbsp;
            <span className='text-primary-light text-[20px] md:text-[32px] relative'>
              Signup
              <span className='absolute bottom-0 left-0 w-[20px] md:w-[80px] border-b-2 border-primary-light'></span>
            </span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className='space-y-2 w-full'>
          <div>
            <input
              type='text'
              name='email'
              placeholder='email'
              className='border border-gray-300 placeholder:text-[12px] text-[12px] rounded w-full h-5 px-5 py-5 mt-2 hover:outline-none focus:outline-none focus:border-gray-600 focus:ring-blue '
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='relative pb-5'>
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              className='border border-gray-300 placeholder:text-[12px] text-[12px] rounded w-full h-5 px-5 py-5 mt-2 hover:outline-none focus:outline-none focus:border-gray-600 focus:ring-blue '
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className='flex flex-col justify-between items-center space-y-5'>
            <button
              type='submit'
              className='mt-4 w-full bg-primary text-white py-2 px-6 rounded-md hover:bg-gradient-to-r hover:from-primary-light hover:to-primary'
            >
              Signup
            </button>

            <div className='flex justify-center w-full text-gray-light text-[12px]'>
              <p>
                Already have an account?
                <Link to='/' className='text-primary'>
                  &nbsp; Login &nbsp;
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
