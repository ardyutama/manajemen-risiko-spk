

export default function inputText({title,type,placeholder,onChange,value}) {
    return (
        <div>
            <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
            >
                {title}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                    type={type}
                    name="price"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 pr-12 sm:text-sm border-gray-300 rounded-md placeholder-gray-300"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                        Currency
                    </label>
                    <select
                        id="currency"
                        name="currency"
                        className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                        <option>Rupiah</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
