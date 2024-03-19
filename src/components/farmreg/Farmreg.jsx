import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './farmreg.scss';
import pic4 from '../../assets/pic4.png';
import upload from '../../assets/upload.svg';
import logo from '../../assets/logo.svg';
import trash from '../../assets/trash.svg';
import Headerlink from '../headerlink/Headerlink';
import MonthSelect from '../month/month';
import { useNavigate } from "react-router-dom"



const Farmreg = () => {
    const [crop, setCrop] = useState('');
    const [numFarms, setNumFarms] = useState(1);
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [farmAdded, setFarmAdded] = useState(false);


    const handleCropChange = (e) => {
        setCrop(e.target.value);
    };

    const handleAddFarm = () => {
        setNumFarms(numFarms + 1);
    };

    const handleDeleteFarm = (index) => {
        if (numFarms === 1) {
            return;
        }
        setNumFarms(numFarms - 1);
    };

    const handleDeleteFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault()
        navigate("../security", { replace: true })

        // window.history.back()
    };

    const onDrop = async (acceptedFiles) => {
        const updatedFiles = acceptedFiles.map((file) => ({
            file,
            progress: 0,
            interval: startProgress(file),
        }));

        setFiles([...files, ...updatedFiles]);
    };

    const startProgress = (file) => {
        const fileSize = file.size;
        let loaded = 0;
        return setInterval(() => {
            const increment = Math.floor(Math.random() * 6) + 5;
            loaded += Math.ceil((fileSize * increment) / 100);
            const percentage = Math.min(Math.ceil((loaded / fileSize) * 100), 100);
            setFiles((prevFiles) => {
                const updatedFiles = prevFiles.map((prevFile) => {
                    if (prevFile.file === file) {
                        return { ...prevFile, progress: percentage };
                    }
                    return prevFile;
                });
                return updatedFiles;
            });
        }, 500);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/png, image/jpeg, application/pdf',
        maxFiles: 5,
        maxSize: 10 * 1024 * 1024,
    });

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCreateAccount = () => {
    };


    const handleContinue = (e) => {
        e.preventDefault()
        setShowModal(true);
    };

    return (
        <div className="farmreg-container">
            <div className="image-container">
                <img src={pic4} alt="placeholder" className="farm-image" />

                {showModal && (
                    <div className="modal">
                        <div className="modal-container">
                            <div className="modal-content">
                                <img src={logo} alt="" className='modal-logo' />
                                <h3>Farm Added!</h3>
                                <p>Would you like to add another farm?</p>
                                <div className="modal-button">
                                    <button className="modal-button1" onClick={handleCreateAccount}>No, create my account</button>
                                    <button className="modal-button2" onClick={closeModal}>Yes, I have another farm</button>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="farmreg">
                <Headerlink />
                <div className="farmreg-form-container">
                    <form>
                        <h1>Create Account</h1>
                        <p className='reg-text'>Farm Registration</p>
                        <div>
                            <label htmlFor="farmName">Farm Name*</label>
                            <input type="text" id="farmName" name="farmName" placeholder="Enter farm name" />
                        </div>
                        <div className="reg-container">
                            <label htmlFor="farmcord-text">Farm Coordinate(Optional)</label>
                            <div className="farmcord">
                                <input type="text" id="longitude" name="longitude" placeholder="Longitude" />
                                <input type="text" id="latitude" name="latitude" placeholder="Latitude" />
                            </div>
                            <p className="cord-text">Ex: Longigtude: 8.6753&deg;E.Latitude: 9.0820&deg;N </p>
                        </div>

                        <h3>Crops cultivated and planting season</h3>

                        {[...Array(numFarms)].map((_, index) => (
                            <div className="card-section" key={index}>
                                <div className="topcard-action">
                                    <p className="crop-number">CROP {index + 1}</p>
                                    {index !== 0 && (
                                        <button className="delete-button" type="button" onClick={() => handleDeleteFarm(index)}>
                                            X
                                        </button>
                                    )}
                                </div>

                                <label htmlFor={`crop-${index}`}>What crop do you cultivate on this farm?</label>
                                <select id={`crop-${index}`} name={`crop-${index}`} value={crop} onChange={handleCropChange} required>
                                    <option value="">Select crop</option>
                                    <option value="rice">Rice</option>
                                    <option value="beans">Beans</option>
                                    <option value="yam">Yam</option>
                                    <option value="maize">Maize</option>
                                </select>
                                <div className="month-select">
                                    <div className="start-month">
                                        <label htmlFor={`start-month-${index}`}>Start month</label>
                                        <MonthSelect id={`start-month-${index}`} />
                                    </div>
                                    <div className="end-month">
                                        <label htmlFor={`end-month-${index}`}>End month</label>
                                        <MonthSelect id={`end-month-${index}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="add-crop" type="button" onClick={handleAddFarm}>
                            + Add another crop
                        </button>
                        <p className="upload-text">Upload farm documents</p>

                        <div className="upload-section">
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="upload-state">
                                    <img src={upload} alt="" />
                                    <p>
                                        <span>Click to upload</span> or drag and drop PNG, JPG or PDF (max .10MB)
                                    </p>
                                </div>
                            </div>

                            {files.map((file, index) => (
                                <div className="dropzone" key={index}>
                                    <div className="dropfile">
                                        <p>{file.file.name}</p>
                                        <img src={trash} alt="" onClick={() => handleDeleteFile(index)} />
                                    </div>
                                    <div className="drop-progress">
                                        <progress className="progress" value={file.progress} max="100"></progress>
                                        <span>{file.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='button-section'>
                            <button className='back' type="submit" onClick={handleBack}>Back</button>
                            <button className='continue' type="submit" onClick={handleContinue} >Add Farm</button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default Farmreg;



