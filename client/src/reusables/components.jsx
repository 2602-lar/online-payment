import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export const TxtInput = ({ label, type, value, setvalue, id, placeholder }) => {
    return (
        <div className='flex flex-col self-center w-full py-2 px-2'>
            <div className="text-white">
                <label>{label}</label>
            </div>
            <div className="border-2 border-gray-400 border-solid rounded-lg">
                <input
                    className='w-full p-2 rounded-lg'
                    id={id}
                    type={type}
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    placeholder={placeholder} />
            </div>
        </div>
    )
}

export const TxtArea = ({ label, type, value, setvalue, id, placeholder }) => {
    return (
        <div className='flex flex-col self-center w-full py-2'>
            <div className="text-black">
                <label>{label}</label>
            </div>
            <div className="border-2 border-black border-solid rounded-lg">
                <textarea
                    className='w-full p-2 rounded-lg h-52'
                    id={id}
                    type={type}
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    placeholder={placeholder} />
            </div>
        </div>
    )
}

export const NavTab = ({ label,  id, url, setValue }) => {
    return (
        <div className='flex flex-col self-center hover:border-t-4 border-t-2 border-gray-200 w-full' onClick={() => setValue(label)}>
          <NavLink className="w-full h-10 text-center  text-lg text-white font-semibold" to={url}>{label}</NavLink>
        </div>
    )
}

export const TxtInputReadOnly = ({ label, type, value, setvalue, id, placeholder }) => {
    return (
        <div className='flex flex-col self-center w-full py-2'>
            <div>
                <label>{label}</label>
            </div>
            <div className="border-2 border-gray-400 border-solid rounded-lg">
                <input
                    className='w-full p-2 rounded-lg'
                    id={id}
                    type={type}
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    placeholder={placeholder} 
                    disabled
                    />
            </div>
        </div>
    )
}

export const TxtInputfancy = ({ label, type, value, setvalue, id, placeholder }) => {
    return (
        <div className='flex flex-col self-center w-full py-2'>
            <div>
                <label className="text-white text-md font-semibold">{label}</label>
            </div>
            <div className="rounded-lg bg-gray-200 dark:bg-[#00000e]">
                <input
                    className='w-full p-2 rounded-lg focus:outline-none'
                    id={id}
                    type={type}
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    placeholder={placeholder} />
            </div>
        </div>
    )
}

export const TxtInputRequired = ({ label, type, value, setvalue, id, placeholder }) => {
    return (
        <div className='flex flex-col self-center w-full py-2 px-2'>
            <div>
                <label>{label}</label>
            </div>
            <div className="border-2 border-black border-solid rounded-lg">
                <input
                    className='w-full p-2 rounded-lg'
                    id={id}
                    type={type}
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    placeholder={placeholder}
                    required
                />
            </div>
        </div>
    )
}

export const RadioInput = ({ name, value }) => {
    return (
        <input
            type='radio'
            name={name}
            value={value}
        />
    )
}

export const SelectInput = ({ options, label, value, setvalue, id }) => {
    return (
        <div className='flex flex-col self-center w-full py-2 px-2'>
            <div>
                <label>{label}</label>
            </div>
            <div className=" border-2 border-black border-solid h-10 rounded-lg">
                <select
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    className="w-full h-full rounded-lg"
                    id={id}
                >
                    <option selected disabled value={''}>Click to select an option</option>
                    {options.map(options => {
                        return (
                            <option className="w-full h-full ">{options.option}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export const FileInput = ({ label, value, setvalue, id, type }) => {

    const handleChange = (e) => {
        const uploadedfile = e.target.files

        if (type === 'image') {
            if (uploadedfile[0].type !== ('image/jpeg' || 'image/jpg' || 'image/png')) {
                toast.warning('Please select a jpeg, jpg or png image format for logo .')
            } else {
                setvalue(uploadedfile[0])
            }
        } else {
            if (uploadedfile[0].type !== 'application/pdf') {
                const uploader = document.getElementById(id)
                uploader.value = null
                toast.warning('Please select a pdf document.')
            } else {
                setvalue(uploadedfile[0])
            }

        }
    }

    return (
        <div className='flex flex-col self-center w-full py-2'>
            <div>
                <label>{label}</label>
            </div>
            <div className="border-2 border-gray-400 border-solid rounded-lg">
                <input
                    className='w-full p-2'
                    id={id}
                    type='file'
                    value={value}
                    onChange={e => handleChange(e, type)}
                />
            </div>
        </div>
    )
}