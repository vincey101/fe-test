import React, { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './farmreg.scss';
import '@splidejs/react-splide/css';
import { useDropzone } from 'react-dropzone';
import pic4 from '../../assets/pic4.png';
import upload from '../../assets/upload.svg';
import logo from '../../assets/logo.svg';
import trash from '../../assets/trash.svg';
import edit from '../../assets/edit.svg';
import farmIcon from '../../assets/farmIcon.svg';
import cropIcon from '../../assets/cropIcon.svg';
import pdfImage from '../../assets/pdfImage.svg';
import latitudeIcon from '../../assets/latitudeIcon.svg';
import Headerlink from '../headerlink/Headerlink';
import MonthSelect from '../month/month';
import { useNavigate } from "react-router-dom"

// import 'react-splide/dist/styles.css';

const Farmreg = () => {
    // const [crop, setCrop] = useState('');
    const [crops, setCrops] = useState(['']);

    const [numFarms, setNumFarms] = useState(1);
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // const [farmAdded, setFarmAdded] = useState(false);
    const [farmName, setFarmName] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [documents, setDocuments] = useState(null);
    const [farmData, setFarmData] = useState([]);
    // const [farms, setFarms] = useState([]);
    const [formValidated, setFormValidated] = useState(false);
    const [farmDataVisible, setFarmDataVisible] = useState(false);
    const [editedFarmIndex, setEditedFarmIndex] = useState(null);
    const [editedFarmData, setEditedFarmData] = useState(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const isFormValid = () => {
        return farmName && longitude && latitude;
    };

    const handleAddFarm = () => {
        setNumFarms(numFarms + 1);
        setEditedFarmData(null);
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

    };

    const onDrop = async (acceptedFiles) => {
        const updatedFiles = acceptedFiles.map((file) => ({
            file,
            progress: 0,
            interval: startProgress(file),
        }));

        setFiles([...files, ...updatedFiles]);
        setDocuments(acceptedFiles);

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

    const saveEditedFarm = () => {
        const updatedFarmData = [...farmData];
        updatedFarmData[editedFarmIndex] = {
            farmName,
            longitude,
            latitude,
            crops,
            documents,
        };
        setFarmData(updatedFarmData);

        
        setEditedFarmIndex(null);
        setFarmName('');
        setLongitude('');
        setLatitude('');
        setCrops('');
        setDocuments('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
        const newFarm = {
            farmName,
            longitude,
            latitude,
            crops,
            documents,
        };
        setFarmData([...farmData, newFarm]);
        setNumFarms(farmData.length + 1);
        setEditedFarmData(null);

        setFarmName('');
        setLongitude('');
        setLatitude('');
        setCrops('');
        setDocuments(null);

        setFarmDataVisible(true);
    };

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
        if (editedFarmIndex !== null) {
            saveEditedFarm();
        } else {
            handleSubmit(e);
            setFiles([]);

        }
    };


    const handleCreateAccount = (e) => {
        e.preventDefault();
        navigate('/verification');

    };


    const handleContinue = (e) => {
        e.preventDefault()

        setIsButtonClicked(true);
        setFormValidated(true);

        if (isFormValid()) {
            setShowModal(true);
            // setClickedFarms([...clickedFarms, farmName]); 

        }

    };


    const deleteFarmCarousel = (index) => {
        const updatedFarmData = [...farmData];
        updatedFarmData.splice(index, 1);
        setFarmData(updatedFarmData);
    };

    const editFarm = (index) => {
        const farmToEdit = farmData[index];
        setFarmName(farmToEdit.farmName);
        setLongitude(farmToEdit.longitude);
        setLatitude(farmToEdit.latitude);
        setCrops([...farmToEdit.crops]);
        setDocuments(farmToEdit.documents);
        setEditedFarmIndex(index);
        setEditedFarmData({ ...farmToEdit, farmNumber: index + 1 });

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

                            <div className="farm-details-card">
                                {farmDataVisible && (
                                    <Splide
                                        className='custom-carousel'
                                        options={{
                                            type: 'slide',
                                            perPage: 1,
                                            pagination: true,
                                        }}
                                    >
                                        {farmData.map((farm, index) => (
                                            <SplideSlide key={index} className='farm-border'>
                                                <div className="farm-actions">
                                                    <p className='farm-number'>Farm {index + 1}</p>
                                                    <div className="edit-delete">

                                                        <img src={edit} alt="" onClick={() => editFarm(index)} />
                                                        <img src={trash} alt="" onClick={() => deleteFarmCarousel(index)} />

                                                    </div>
                                                </div>

                                                <p className='line1'></p>

                                                <div className='farm-info'>
                                                    <div className="farm-design">

                                                        <div className="title">
                                                            <img src={farmIcon} alt="" className='card-icon' />
                                                            <p>Farm Name</p>
                                                        </div>
                                                        <div className="details">
                                                            <p className='farm-name'> {farm.farmName}</p>
                                                        </div>
                                                    </div>

                                                    <div className="farm-design">

                                                        <div className="title">
                                                            <img src={latitudeIcon} alt="" className='card-icon' />
                                                            <p>Longitude</p>
                                                        </div>

                                                        <div className="details">
                                                            <p className='longitude-text'> {farm.longitude}&deg;E</p>
                                                        </div>

                                                    </div>
                                                    <div className="details">
                                                        <p >Latitude</p>
                                                        <p className='latitude-text'> {farm.latitude}&deg;N</p>

                                                    </div>
                                                </div>

                                                <p className='line1'></p>

                                                <div className="farm-info2">
                                                    <div className="farm-design">
                                                        <div className="title">
                                                            <img src={cropIcon} alt="" className='card-icon' />
                                                            <p>Crops Produced</p>
                                                        </div>
                                                        <div className="crops">
                                                        {farm.crops.map((crop, cropIndex) => (
                                                            <p key={cropIndex} className='crop-design'>{crop}</p>
                                                        ))}
                                                            
                                                        </div>
                                                        {/* <p className='crop-design'> {farm.crop}</p> */}
                                                    </div>

                                                    <div className="details">
                                                        <p>Documents</p>
                                                        {farm.documents ? (
                                                            <img src={pdfImage} alt="" className='card-icon' />
                                                        ) : (
                                                            <p>No document</p>
                                                        )}
                                                    </div>
                                                </div>

                                            </SplideSlide>
                                        ))}
                                    </Splide>
                                )}

                            </div>


                            <div className="farm-container">
                                <div className="line"></div>
                                {editedFarmData ? (
                                    <p className='farm-number'> FARM {editedFarmData.farmNumber}</p>
                                ) : (
                                    <p className='farm-number'> FARM {farmData.length > 0 ? farmData.length + 1 : 1}</p>
                                )}
                                <div className="line"></div>
                            </div>


                            <label htmlFor="farmName">Farm Name*</label>
                            <input type="text" id="farmName" name="farmName" value={farmName} onChange={(e) => setFarmName(e.target.value)} placeholder="Enter farm name" required/>

                        </div>
                        <div className="reg-container">
                            <label htmlFor="farmcord-text">Farm Coordinate(Optional)</label>
                            <div className="farmcord">
                                <input type="text" id="longitude" name="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" required/>

                                <input type="text" id="latitude" name="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" required/>

                            </div>
                            <p className="cord-text">Ex: Longitude: 8.6753&deg;E.Latitude: 9.0820&deg;N </p>
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
                                <select
                                    id={`crop-${index}`}
                                    name={`crop-${index}`}
                                    value={crops[index]}
                                    onChange={(e) => {
                                        const updatedCrops = [...crops];
                                        updatedCrops[index] = e.target.value;
                                        setCrops(updatedCrops);
                                    }}
                                >

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
                            <button className='continue' type="submit" onClick={handleContinue}>Add Farm</button>
                        </div>
                        {isButtonClicked && !isFormValid() && formValidated && (
                                <p className="error-message">Please fill in all required fields</p>
                            )}
                    </form>


                </div>
            </div>


        </div>
    );
};

export default Farmreg;



