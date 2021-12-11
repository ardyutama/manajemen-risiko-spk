import React, { useState, useEffect } from "react";
import InputText from "../components/inputText";
export default function Decision() {
    const [data, setData] = useState([]);
    const [payoff, setPayoff] = useState([[]]);
    const [exReturn, setExReturn] = useState([[]]);
    const [beli, setBeli] = useState("");
    const [jual, setJual] = useState("");
    const [id, setId] = useState(0);
    const [permintaan, setPermintaan] = useState("");
    const [probabilitas, setProbabilitas] = useState("");
    const [display, setDisplay] = useState(false);
    const [findMax,setFindMax] = useState("");
    const addData = () => {
        if (permintaan !== "" && probabilitas !== "") {
            setData([
                ...data,
                {
                    id,
                    permintaan: parseInt(permintaan),
                    probabilitas: parseFloat(probabilitas),
                },
            ]);
            setId(id + 1);
        }
        setPermintaan("");
        setProbabilitas("");
    };

    const handleDeleteData = (i) => {
        const itemRemoved = data.splice(i, 1);
        setData(data.filter((data) => data !== itemRemoved));
    };
    const handleResetData = (i) => {
        const itemRemoved = data.splice(0, i);
        setData(data.filter((data) => data !== itemRemoved));
        setFindMax("");
    };

    const handleKeyPress = (code) => {
        if (code === "Enter") {
            addData();
        }
    };

    const transpose = (a) => {
        return Object.keys(a[0]).map(function (c) {
            return a.map(function (r) {
                return r[c];
            });
        });
    };

    const calculatePayoff = () => {
        var temp = new Array(data.length);
        for (var i = 0; i < temp.length; i++) {
            temp[i] = new Array(data.length);
        }
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].permintaan < data[i].permintaan) {
                    temp[i][j] =
                        data[j].permintaan * jual - data[i].permintaan * beli;
                } else {
                    temp[i][j] =
                        data[i].permintaan * jual - data[i].permintaan * beli;
                }
            }
        }
        setPayoff(transpose(temp));
        return temp;
    };

    const calculateReturn = async () => {
        const payoffRef = await calculatePayoff();
        var temp = new Array(data.length);
        for (var i = 0; i < temp.length; i++) {
            temp[i] = new Array(data.length);
        }
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                temp[i][j] = data[j].probabilitas * payoffRef[i][j];
            }
        }
        for (let i = 0; i < temp.length; i++) {
            var sum = 0;
            for (let j = 0; j < temp.length; j++) {
                sum += temp[i][j];
            }
            temp[i][temp.length] = sum;
        }
        setExReturn(transpose(temp));
        // handleFindMax();
        console.log(payoffRef);
    };
    const handleFindMax = () => {
        // let newArray= exReturn[4];
        // console.log(newArray);
        const calc = Math.max(...exReturn[exReturn.length - 1]);
        setFindMax(calc);
        console.log(calc);
    };
    useEffect(() => {
        if (data.length > 0) 
        calculateReturn();
        // handleFindMax();
    }, [data, beli, jual]);
    
    return (
        <div className="flex min-h-screen justify-center item-center bg-gray-200">
            <div className="p-8 inline-block m-4 border-2 rounded-lg bg-white">
                <div className="">
                    <p className="font-bold text-2xl">Manajemen Risiko</p>
                    <p className="text-lg">
                        By Ardy Putra Utama - Politeknik Elektronika Negeri
                        Surabaya - 2110191056
                    </p>
                    <a href="../assets/2110191056_Ardy Putra Utama3.pdf" download>
                        User Guide
                    </a>
                </div>
                <div className="flex flex-col gap-8 ">
                    <div className="flex font-bold mt-6 gap-4">
                        <InputText
                            title="Harga Beli"
                            type="text"
                            value={beli}
                            placeholder="try 200"
                            onChange={(e) => setBeli(e.target.value)}
                        ></InputText>

                        <InputText
                            title="Harga Jual"
                            type="text"
                            value={jual}
                            placeholder="try 350"
                            onChange={(e) => setJual(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="inline-flex flex-col gap-4 border-2 p-6 rounded-xl drop-shadow">
                            <p className="font-bold text-gray-700">
                                Data Permintaan dan Probabilitas
                            </p>
                            <table className="divide-y divide-gray-200 w-auto bg-white ">
                                <thead className="bg-blue-200">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                                        >
                                            No.
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                                        >
                                            Permintaan (Unit/Hari)
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                                        >
                                            Probabilitas
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {(data?.length &&
                                        data.map((list, i) => (
                                            <tr key={i}>
                                                <td className="px-6 whitespace-nowrap py-4">
                                                    {i + 1}.
                                                </td>
                                                <td className="px-6 whitespace-nowrap py-4">
                                                    {list.permintaan}
                                                </td>
                                                <td className="px-6 whitespace-nowrap py-4">
                                                    {list.probabilitas}
                                                </td>
                                                <td className="items-center justify-center">
                                                    <svg
                                                        className="w-4 h-4 text-red-600 cursor-pointer mx-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        onClick={() =>
                                                            handleDeleteData(i)
                                                        }
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </td>
                                            </tr>
                                        ))) ||
                                        null}
                                    <tr>
                                        <td className="px-6 whitespace-nowrap">
                                            {(data?.length &&
                                                data.length + 1) ||
                                                1}
                                            .
                                        </td>
                                        <td className="px-4 py-4">
                                            <input
                                                className="w-full px-2 rounded-xl border-gray-300 placeholder-gray-300"
                                                type="number"
                                                value={permintaan}
                                                placeholder="Isi Permintaan"
                                                onChange={(e) =>
                                                    setPermintaan(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-4">
                                            <input
                                                className="w-full px-2 rounded-xl border-gray-300 placeholder-gray-300"
                                                type="number"
                                                value={probabilitas}
                                                placeholder="Isi Prob (Total <= 1.00)"
                                                onChange={(e) =>
                                                    setProbabilitas(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    handleKeyPress(e.key)
                                                }
                                            />
                                        </td>
                                        <td className="items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-green-600 cursor-pointer mx-1"
                                                onClick={addData}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                onClick={() => {
                                    setDisplay(!display);
                                    handleFindMax();
                                }}
                            >
                                Hitung!
                            </button>
                        </div>
                    </div>
                    {display ? (
                        <div className="inline-flex flex-col gap-4">
                            <div className="inline-flex flex-col gap-4">
                                <div className="inline-flex flex-col gap-4 border-2 p-6 rounded-xl">
                                    <p className="font-bold mt-6">
                                        Tabel Pay Off
                                    </p>
                                    <table className="divide-y divide-gray-200 w-auto bg-white">
                                        <thead className="bg-blue-200">
                                            <tr>
                                                <td
                                                    colSpan="1"
                                                    rowSpan="2"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400"
                                                >
                                                    probabilitas
                                                </td>
                                                <td
                                                    colSpan={data.length}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400 text-center"
                                                >
                                                    jumlah permintaan dan
                                                    probabilitas
                                                </td>
                                            </tr>
                                            <tr>
                                                {(data?.length &&
                                                    data.map((list, i) => (
                                                        <td
                                                            key={i}
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400"
                                                        >
                                                            {list.permintaan} ={" "}
                                                            {list.probabilitas}
                                                        </td>
                                                    ))) || <td>-</td>}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {(data?.length &&
                                                data.map((list, i) => (
                                                    <tr>
                                                        <td
                                                            key={i}
                                                            className="px-6 whitespace-nowrap py-4"
                                                        >
                                                            {list.permintaan}
                                                        </td>
                                                        {payoff?.length &&
                                                            payoff.map(
                                                                (list, j) => (
                                                                    <td
                                                                        key={j}
                                                                        className="px-6 whitespace-nowrap py-4"
                                                                    >
                                                                        {
                                                                            list[
                                                                                i
                                                                            ]
                                                                        }
                                                                    </td>
                                                                )
                                                            )}
                                                    </tr>
                                                ))) || <td>-</td>}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="inline-flex flex-col border-2 p-6 rounded-xl">
                                    <p className="font-bold mt-6">
                                        Tabel Pay Off Net Cash Flows
                                    </p>
                                    <table className="divide-y divide-gray-200 w-3/4 bg-white">
                                        <thead className="bg-blue-200">
                                            <tr>
                                                <td
                                                    colSpan="1"
                                                    rowSpan="2"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400"
                                                >
                                                    expected result
                                                </td>
                                                <td
                                                    colSpan={data.length}
                                                    rowSpan="1"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400 text-center"
                                                >
                                                    probabilitas
                                                </td>
                                                <td
                                                    colSpan="1"
                                                    rowSpan="2"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400"
                                                >
                                                    ER
                                                </td>
                                            </tr>
                                            <tr>
                                                {(data?.length &&
                                                    data.map((list, i) => (
                                                        <td
                                                            key={i}
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400"
                                                        >
                                                            {list.probabilitas}
                                                        </td>
                                                    ))) || <td>-</td>}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {(data?.length &&
                                                data.map((list, i) => (
                                                    <tr>
                                                        <td
                                                            key={i}
                                                            className="px-6 whitespace-nowrap py-4"
                                                        >
                                                            ER ={" "}
                                                            {list.permintaan}
                                                        </td>
                                                        {exReturn?.length &&
                                                            exReturn.map(
                                                                (list, j) => (
                                                                    <td
                                                                        key={j}
                                                                        className="px-6 whitespace-nowrap py-4"
                                                                    >
                                                                        {
                                                                            list[
                                                                                i
                                                                            ]
                                                                        }
                                                                    </td>
                                                                )
                                                            )}
                                                    </tr>
                                                ))) || <td>-</td>}
                                        </tbody>
                                    </table>
                                </div>
                                <button class="rounded-full bg-blue-400 inline py-2 font-semibold text-blue-50">
                                    Maka Hasil Terbaik adalah {findMax}
                                </button>
                            </div>
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                onClick={() => {
                                    setDisplay(false);
                                    handleResetData(data.length);
                                    setBeli("");
                                    setJual("");
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
