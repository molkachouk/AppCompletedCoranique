import { Box, TextField, Typography, Button, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import{getAllCategories} from '../../../redux/categorieRelated/categorieHandle';
import {getAllSalles} from '../../../redux/salleRelated/salleHandle';
import { getAllGroups } from '../../../redux/groupRelated/groupHandle';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {updateExamen}from '../../../redux/examenRelated/examenHandle'
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import SelectInput from '@mui/material/Select/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function ModalUpdate({ openModal, handleCloseModal, examId  }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { categoriesList, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categorie);
  const { sallesList} = useSelector((state) => state.salle);
  const { teachersList, loading: teachersLoading, error: teachersError } = useSelector((state) => state.teacher);



    const [NameExam, setNameExam] = useState('');
    const [DateExam, setDateExam] = useState('');
    const [heureDebut, setHeureDebut] = useState(dayjs());
    const [heureFin, setHeureFin] = useState(dayjs());
    const [typeExam, setTypeExam] = useState('');
    const [matiereExam, setMatiereExam] = useState('');
    const [salleExam, setSalleExam] = useState(false);
    const [groupe, setGroupe] = useState('');
    const [teachers, setTeachers] = useState([]);
     const [period, setPeriod] = useState('');
    const [recite, setRecite] = useState('');
    const [cleared, setCleared] = React.useState(false);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const url = "http://localhost:5000";

    useEffect(() => {
      async function fetchExamen() {
        try {
          const response = await axios.get(`${url}/api/Examen/${examId}`);
          const examenData = response.data;
          setNameExam(examenData.NameExam);
          setDateExam(examenData.DateExam);
          setHeureDebut(examenData.heureDebut);
          setHeureFin(examenData.heureFin);
          setTypeExam(examenData.typeExam);
          setMatiereExam(examenData.matiereExam);
          setSalleExam(examenData.salleExam);
          setGroupe(examenData.groupe);
          setTeachers(examenData.teachers);
          setPeriod(examenData.period);
          setRecite(examenData.recite);
          console.log(examenData)

        } catch (error) {
          console.error('Error fetching event data:', error);
        }
      }
      fetchExamen();
    }, [examId]);
  

    useEffect(() => {
      const fetchGroupsByCategory = async () => {
        try {
          if (matiereExam) {
            const response = await axios.get(`api/Groups/${matiereExam}`);
            if (response.data.message) {
              // Handle case where no groups are found for the selected category
              setFilteredGroups([]);
            } else {
              setFilteredGroups(response.data);
            }
          }
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      };
    
      fetchGroupsByCategory();
    }, [matiereExam]);


    useEffect(() => {
      dispatch(getAllGroups(id));
    }, [dispatch, id]);
    useEffect(() => {
      dispatch(getAllCategories(id));
    }, [dispatch, id]);
    useEffect(() => {
      dispatch(getAllTeachers(id));
    }, [dispatch, id]);
  
   
  
    const handleSubmit = async() => {
      console.log('Submit button clicked');
      const updatedExamData = {
        NameExam,
        DateExam,
        heureDebut,
        heureFin,
        typeExam,
        matiereExam,
        salleExam,
        groupe,
        teachers: teachers.split(',').map(name => ({ name_arabe: name.trim() })),
      };
      console.log('Updated Exam Data:', updatedExamData);
      try {
        const formData = new FormData(); // Create a new FormData object
  
        // Append form data fields to FormData object
        formData.append('NameExam', NameExam);
        formData.append('DateExam', DateExam);
        formData.append('heureDebut', heureDebut);
        formData.append('heureFin', heureFin);
        formData.append('typeExam', typeExam);
        formData.append('matiereExam', matiereExam);
        formData.append('salleExam', salleExam); 
        formData.append('groupe', groupe);
        formData.append('teachers', teachers);
        formData.append('period', period);
        formData.append('recite', recite);

        console.log('Form Data:', formData); // Debugging console log
  
        await dispatch(updateExamen(formData, examId, "Examen"));
        toast.success('Examen updated successfully!');
        handleCloseModal();

    } catch (error) {
        console.error('update Secretary failed:', error);
        toast.error('Failed to update Examen. Please try again.');

    }
      // Send updatedExamData to backend API
      handleCloseModal();
    };
    const handleMatiereChange = (event) => {
        // Check if event.target exists before accessing its value
        const selectedmatiere = event.target ? event.target.value : null;
        setMatiereExam(selectedmatiere);
        // Update the options for the subcategory dropdown based on the selected category
        setGroupe('');
      };

    React.useEffect(() => {
        if (cleared) {
          const timeout = setTimeout(() => {
            setCleared(false);
          }, 1500);
    
          return () => clearTimeout(timeout);
        }
        return () => {};
      }, [cleared]);
      const selectedCategory = categoriesList.find(category => category._id === matiereExam);
      const matiereExamField = selectedCategory && selectedCategory.name_categorie === 'تجويد' ? (
        <Box
          sx={{
            '& > :not(style)': { mt: 1, width: '25ch' },
            borderRadius: 50, // Add border radius
            '& .MuiOutlinedInput-root': {
              borderRadius: 50, // Add border radius
            },
          }}
        >
          <TextField
            id="outlined-basic"
            label="الرواية"
            variant="outlined"
            InputProps={{
              style: {
                borderRadius: 50, // Adjust the border radius as needed
              },
            }}
            value={recite}
            onChange={(e)=>setRecite(e.target.value)}
          />
        </Box>
      ) : null;

  return (
    <div>
         <Modal
                open={openModal} onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                BackdropProps={{
                  slotProps: { backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } } },
              }} // Customize Backdrop style
              sx={{
                  '& .MuiBackdrop-root': {
                      backgroundColor: 'transparent', // Set backdrop background color to transparent
                  },
              }}
            >
            <form onSubmit={handleSubmit}>
                <Box sx={{
                    position: 'absolute',
                    width: 600,
                    bgcolor: 'background.paper',
                    borderRadius: 5,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add box shadow

                    p: 4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                >
                    <Typography id="modal-title" variant="h6" component="h2" style={{ fontFamily: 'Cairo, sans-serif',color: "#AF4E09" }}>
                        تحديث البيانات
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box >
                        
                    <TextField
                        label="اسم الامتحان"
                        variant="outlined"
                        value={NameExam}
                        onChange={(e) => setNameExam(e.target.value)}
                        InputProps={{
                          style: {
                            borderRadius: 50, // Adjust the border radius as needed
                          },
                          
                        }}
                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >

                   <DatePicker
          id="date"
          value={DateExam ? dayjs(DateExam) : null}
          onChange={(newValue) => {
            if (newValue) {
              setDateExam(newValue.format('YYYY-MM-DD'));
              setCleared(false);
            } else {
              setDateExam('');
              setCleared(true);
            }
          }}
          InputLabelProps={{ shrink: true }}
          sx={{
            width: 260,
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            },
          }}
          slotProps={{
            field: { clearable: true, onClear: () => setCleared(true) },
          }}
        />
        </LocalizationProvider>
                    </Box>
                    <Box>
                    <input type='time' value={heureDebut.format('HH:mm')} onChange={(e) => setHeureDebut(dayjs(e.target.value, 'HH:mm'))} label="بداية الوقت "/>   

                    
                    <input type='time' value={heureFin.format('HH:mm')}  onChange={(e) => setHeureFin(dayjs(e.target.value, 'HH:mm'))}  label="نهاية الوقت "/>   

                    </Box>
                    <Box>
                    <FormControl variant="outlined" margin="dense" sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 }, borderRadius: 50, '& .MuiOutlinedInput-root': { borderRadius: 50 } }}>
                        <InputLabel id={`typeExam-label`}>نوع الإمتحان</InputLabel>
                        <Select
                          labelId={`typeExam-label`}
                          id={`typeExam`}
                          
                          onChange={(event) => setTypeExam(event.target.value)}
                          label='نوع الإمتحان'
                          value={typeExam}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="كتابي">كتابي</MenuItem>
                         <MenuItem value="شفاهي">شفاهي</MenuItem>  
                        </Select>
                      </FormControl>
                    
                      <FormControl variant="outlined" margin="dense" sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 }, borderRadius: 50,'& .MuiOutlinedInput-root': {
                      borderRadius: 50, // Add border radius
                    }, }}>
                  <InputLabel id={`matiereExam-label`}>المادة</InputLabel>
                  <Select
                      labelId={`matiereExam-label`}
                      id={`matiereExam`}
                      onChange={handleMatiereChange}
                      label='المادة'
                      value={matiereExam}
                    >
                      {Array.isArray(categoriesList) &&
                        categoriesList.map((categorie) => (
                          <MenuItem key={categorie._id} value={categorie._id}>
                            {categorie.name_categorie}
                          </MenuItem>
                        ))
                      }
                    </Select>
                </FormControl>
                    </Box>
                    <Box>
                    <FormControl variant="outlined" margin="dense" sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 }, borderRadius: 50, '& .MuiOutlinedInput-root': { borderRadius: 50 } }}>
                        <InputLabel id={`salleExam-label`}>القاعة</InputLabel>
                        <Select
                          labelId={`salleExam-label`}
                          id={`salleExam`}
                          
                          onChange={(event) => setSalleExam(event.target.value)}
                          label='القاعة'
                          value={salleExam}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {Array.isArray(sallesList) &&
                            sallesList.map((salle) => (
                              <MenuItem key={salle._id} value={salle._id}>
                                {salle.name_salle}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    
                      <FormControl  margin="dense"  disabled={!matiereExam} sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 }, borderRadius: 50, '& .MuiOutlinedInput-root': { borderRadius: 50 } }}>
                  <InputLabel id="groupe-label">مجموعة الإمتحان</InputLabel>
                  <Select
                    labelId="groupe-label"
                    id="groupe-select"
                    value={groupe}
                    onChange={(event) => setGroupe(event.target.value)}
                    label="مجموعة الإمتحان"
                  >
                    {Array.isArray(filteredGroups) &&
                    filteredGroups.map((groupe) => (
                      <MenuItem key={groupe._id} value={groupe._id}>
                        {groupe.name_group}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                    </Box>
                    <Box>
                    <FormControl variant="outlined" margin="dense" sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 }, borderRadius: 50,'& .MuiOutlinedInput-root': {
      borderRadius: 50, // Add border radius
    }, }}>
                  <InputLabel id={`teachers-label`}>مدرس</InputLabel>
                  <Select
                      labelId={`teachers-label`}
                      id={`teachers`}
                      onChange={(event) => setTeachers(event.target.value)}
                      label='مدرس'
                      multiple
                      value={teachers}
                    >
                      {Array.isArray(teachersList) &&
                        teachersList.map((teacher) => (
                          <MenuItem key={teacher._id} value={teacher._id}>
                            {teacher.name_arabe}
                          </MenuItem>
                        ))
                      }
                    </Select>
                </FormControl> 
                <TextField id="outlined-basic" label="الدورة" variant="outlined" InputProps={{
                style: {
                  borderRadius: 50, // Adjust the border radius as needed
                },
                
              }}  value={period} onChange={(e)=>setPeriod(e.target.value)}/> 
                    </Box>
                    <Box sx={{
                      '& > :not(style)': { mt: 1, width: '25ch' },
                      borderRadius: 50, // Add border radius
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 50, // Add border radius
                      },
                    }}>
                    {matiereExamField}

                    </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" type="submit">تحديث</Button>
                    <Button variant="outlined" onClick={handleCloseModal} sx={{ ml: 2 }}>إلغاء</Button>
                    </Box>
                </Box>
                </form>
            </Modal>
    </div>
  )
}
