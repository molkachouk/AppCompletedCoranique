import React, { useEffect, useRef, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Switch
} from '@mui/material';
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllGroups } from '../../../redux/groupRelated/groupHandle';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {getAllSalles} from '../../../redux/salleRelated/salleHandle';
import { getAllExamen } from '../../../redux/examenRelated/examenHandle';
import{getAllCategories} from '../../../redux/categorieRelated/categorieHandle';
import dayjs from 'dayjs';
import axios from 'axios';

function DropDownInput({ input_id, title, inputRef, options, value, onChange, isTarget, handleSlot }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (isTarget) {
      handleSlot(selectedValue);
    }
    onChange(selectedValue);
  };

  return (
    <FormControl variant="outlined" margin="dense" sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 }, borderRadius: 50, // Add border radius
    '& .MuiOutlinedInput-root': {
      borderRadius: 50, // Add border radius
    }, }}>
      <InputLabel id={`${input_id}-label`}>{title}</InputLabel>
      <Select
        labelId={`${input_id}-label`}
        id={input_id}
        inputRef={inputRef}
        onChange={handleChange}
        label={title}
        value={value}
      >
        {options.map(item => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}



export default function ExamDashboard() {


  const semRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const branchRef = useRef();
    const slotRef = useRef();
    const subRef = useRef();
    const formRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { status, currentUser, error } = useSelector(state => state.user);

    const { groupsList, loading: groupLoading, error: groupError } = useSelector((state) => state.group);
    const { teachersList, loading: teachersLoading, error: teachersError } = useSelector((state) => state.teacher);
    const { categoriesList, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categorie);
    const { sallesList} = useSelector((state) => state.salle);
    console.log(categoriesList)



    const [NameExam, setNameExam] = useState('');
    const [DateExam, setDateExam] = useState('');
    const [heureDebut, setHeureDebut] = useState(dayjs());
    const [heureFin, setHeureFin] = useState(dayjs());
    const [typeExam, setTypeExam] = useState('');
    const [matiereExam, setMatiereExam] = useState('');
    const [salleExam, setSalleExam] = useState(false); 
    const [groupe, setGroupe] = useState('');
    const [teachers, setTeachers] = useState([]); // Initialize as an empty array

    const [period, setPeriod] = useState('');
    const [recite, setRecite] = useState('');
    const [sortBy, setSortBy] = useState('date'); // Initialize with 'date' as default



    const [filteredGroups, setFilteredGroups] = useState([]);


    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [exams, setExams] = useState([]);
    const [cleared, setCleared] = React.useState(false);
    const [category, setCategory] = useState('');

  const [subcategory, setSubcategory] = useState('');
 // const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedsubCategory, setSelectedsubCategory] = useState('');
  const selectedCategory = categoriesList.find(category => category._id === matiereExam);
  console.log(selectedCategory)
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
  console.log(matiereExamField)
console.log(matiereExam)



  useEffect(() => {
    dispatch(getAllSalles());
}, [dispatch]);

  useEffect(() => {
    dispatch(getAllTeachers(id));
  }, [dispatch, id]);
useEffect(() => {
  dispatch(getAllGroups(id));
}, [dispatch, id]);

useEffect(() => {
  dispatch(getAllCategories(id));
}, [dispatch, id]);
useEffect(() => {
  dispatch({ type: 'GET_REQUEST' });
  dispatch(getAllExamen());
}, [dispatch]);

/*useEffect(() => {
  const fetchGroupsByCategory = () => {
    if (matiereExam) {
      const filtered = groupsList.filter(group => group.name_categorie === matiereExam);
      setFilteredGroups(filtered);
    }
  };
  fetchGroupsByCategory();
}, [matiereExam, groupsList]);*/

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

const handleMatiereChange = (event) => {
  // Check if event.target exists before accessing its value
  const selectedmatiere = event.target ? event.target.value : null;
  setMatiereExam(selectedmatiere);
  // Update the options for the subcategory dropdown based on the selected category
  setGroupe('');
};
  

  const handlegroupChange = (event) => {
    setGroupe(event.target.value);
  };

  const handleCategoryTableChange = (event, categoryId) => {
    setSelectedCategory(categoryId);
  };
  const handleSubcategoryTableChange = (event) => {
    setSelectedsubCategory(event.target.value);
  };


 
    //const subArray = ['Subject 1', 'Subject 2', 'Subject 3']; // Example subjectsvvv

    const handleSlot = () => {
      // Handle slot change
  };

  const handleFiles = () => {
      // Handle file upload
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


  const handleSchedule = async (event) => {
      event.preventDefault();
     
      
      const formData = new FormData();
  
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
  
      try {

          const response = await axios.post('/api/ExamenCreate', formData , {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });

          console.log(response.data);

          toast.success('examen registered successfully.');
      } catch (error) {
          console.error('add failed:', error);
      
      }
      // Handle scheduling
  };

  const handleToggle = () => {
    setSortBy(sortBy === 'date' ? 'heureDebut' : 'date');
  };

const title = sortBy === 'date' ? 'Sort By Date' : 'Sort By Branch';

// Determine the checked status of the Switch based on the current sort option
const checked = sortBy === 'date';

// Determine the sorting logic for the exams based on the current sort option
const sortedExams = exams.slice().sort((a, b) => {
  if (sortBy === 'date') {
    // Sort by date exam
    return new Date(a.DateExam) - new Date(b.DateExam);
  } else {
    // Sort by start time (heure debut)
    return new Date(a.heureDebut) - new Date(b.heureDebut);
  }
});

  const handleDelete =async (id) => {
    try {
      // Make a DELETE request to delete the exam
      await axios.delete(`/api/Examen/${id}`);
      // Filter out the deleted exam from the exams state
      const updatedExams = exams.filter(exam => exam._id !== id);
      setExams(updatedExams);
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  const handleClearAll = () => {
      // Handle clear all
  };

  const handleNext = () => {
      // Handle next
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        // Fetch the list of exams
        const response = await axios.get('/api/Examens');
        // Assuming the response contains the list of exams
        const fetchedExams = response.data;
        setExams(fetchedExams);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exams:', error);
        setLoading(false);
      }
    };
    fetchExams();
  }, []);
  return (
    <div>
    <AppBar position="static" sx={{marginTop:'20px', direction:'ltr',backgroundColor:'white'}}>
      
       
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ flexGrow: 1, alignSelf: 'flex-end',color:'#2A5551',fontFamily:'Cairo',fontSize:'30px',margin:'10px 0px 10px 0px'}}
        >
         <span style={{ fontWeight:'700'}}> لوحة التحكم:</span>الإمتحانات
        </Typography>

        
        
      
    </AppBar>
    <div>
    <Box display="flex" flexDirection="column" flexGrow={1}>
    <Box display="flex" flexDirection="row"  flexWrap="wrap" p={2}>
      {/*/////////////////////////////////////////////////////////////semestre box */}
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
                        <Typography variant="h6" fontWeight="bold" style={{color:'#2A5551',fontFamily:'Cairo',fontSize:'20px'}}>
                             إختر السداسية
                        </Typography>
                        <FormControl variant="outlined" margin="dense" sx={{ ml: 2, minWidth: 200 }}>
                            <InputLabel>السداسية</InputLabel>
                            <Select
                                label="السداسية"
                                inputRef={semRef}
                                onChange={handleSlot}
                            >
                                {[...Array(8).keys()].map(i => (
                                    <MenuItem value={i + 1} key={i}>السداسية {i + 1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                          {/*/////////////////////////////////////////////////////////////upload file csv*/}

                    <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
                        <Typography variant="h6" fontWeight="bold" style={{color:'#2A5551',fontFamily:'Cairo',fontSize:'20px'}}>
                            تحميل جدول الإمتحانات
                        </Typography>
                        <input
                            type="file"
                            id="myFiles"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            multiple
                            style={{ marginLeft: '16px' ,color:'#2A5551',fontFamily:'Cairo',fontSize:'15px'}}
                        />
                        <Button variant="contained" color="success" sx={{ ml: 2 }} onClick={handleFiles} style={{fontFamily:'Cairo',fontSize:'17px'}} >
                            تحميل
                        </Button>
                    </Box>
                    </Box>
                    <Box px={2} pt={3} my={1}>
                      {/*/////////////////////////////////////////////////////////////Row of add exam*/}

                    <Typography variant="h6" fontWeight="bold" mb={2} style={{color:'#2A5551',fontFamily:'Cairo',fontSize:'20px'}}>
                         إضافة إمتحان
                    </Typography>
                                       {/*/////////////////////////////////////////////////////////////start form*/}

                    <form ref={formRef} onSubmit={handleSchedule}>

              <Box display="flex" flexDirection="row" gap={2}>
              <Box
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
              <TextField id="outlined-basic" label="إسم الإمتحان" variant="outlined" value={NameExam} onChange={(e)=>setNameExam(e.target.value)} InputProps={{
    style: {
      borderRadius: 50, // Adjust the border radius as needed
    },
    
  }} />
              </Box>
                   {/*/////////////////////////////////////////////////////////////date input*/}

                {/*<TextField
                  id="date"
                  label="Date"
                  type="date"
                  inputRef={dateRef}
                  InputLabelProps={{ shrink: true }}
                              />*/}

                 <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          position: 'relative',
          marginTop:'10px',
          
        }}
        
      >
        <DatePicker
          id="date"
          inputRef={dateRef}
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

        {cleared && (
          <Alert
            sx={{ position: 'absolute', bottom: 0, right: 0 }}
            severity="success"
          >
            Field cleared!
          </Alert>
        )}
      </Box>
      <Box  sx={{
          height: '100%',
          display: 'flex',
          position: 'relative',
          
        }}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="بداية الوقت  " sx={{ borderRadius: '50px', '& .MuiInputLabel-root': { right:30, transformOrigin: 'right' },'& .MuiOutlinedInput-root': { borderRadius: '50px', }, }} 
        value={heureDebut}      
        onChange={(newValue) => setHeureDebut(newValue)}/>
      </DemoContainer>
      </Box>
      <Box  sx={{
          height: '100%',
          display: 'flex',
          position: 'relative',
          
          
        }}>
      <DemoContainer components={['TimePicker']} >
        <TimePicker label="نهاية الوقت " sx={{  borderRadius: '50px','& .MuiInputLabel-root': { right:30, transformOrigin: 'right' },'& .MuiOutlinedInput-root': { borderRadius: '50px', }, }} value={heureFin}      
        onChange={(newValue) => setHeureFin(newValue)}          />
      </DemoContainer>
      </Box>
    </LocalizationProvider>
                       {/*/////////////////////////////////////////////////////////////end date input*/}
      

               
                       <DropDownInput
                        input_id="typeExam"
                        title="نوع الإمتحان"
                        inputRef={slotRef}
                        options={['كتابي', 'شفاهي']}
                        value={typeExam}
                        onChange={setTypeExam}
                        isTarget
                        handleSlot={handleSlot}
                      />               {/*  <DropDownInput input_id="salleExam" title="القاعة " inputRef={subRef} options={sallesList}  
                value={salleExam} // Set the value to the state variable salleExam
                onChange={(event) => setSalleExam(event.target.value)}  />*/}

                      <FormControl variant="outlined" margin="dense" sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 }, borderRadius: 50, '& .MuiOutlinedInput-root': { borderRadius: 50 } }}>
                        <InputLabel id={`salleExam-label`}>القاعة</InputLabel>
                        <Select
                          labelId={`salleExam-label`}
                          id={`salleExam`}
                          inputRef={subRef}
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

                

               
              </Box>
              {/*///////////////////////////the second row */}
              <Box display="flex" flexDirection="row" gap={2}>
              {/* <DropDownInput
  input_id="matiereExam"
  title="المادة"
  inputRef={subRef}
  options={categoriesList.map(categorie => categorie.name_categorie)}
  value={matiereExam}
  onChange={(event)=>setMatiereExam(event.target.value)}
/>*/}
<FormControl variant="outlined" margin="dense" sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 }, borderRadius: 50,'& .MuiOutlinedInput-root': {
      borderRadius: 50, // Add border radius
    }, }}>
                  <InputLabel id={`matiereExam-label`}>المادة</InputLabel>
                  <Select
                      labelId={`matiereExam-label`}
                      id={`matiereExam`}
                      onChange={(event) => setMatiereExam(event.target.value)}
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
                 

                <Box  sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                  borderRadius: 50, // Add border radius
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 50, // Add border radius
                  },
                }}
                noValidate
                autoComplete="off">
                  <FormControl fullWidth margin="normal" disabled={!matiereExam}>
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
                 <Box  sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        borderRadius: 50, // Add border radius
        '& .MuiOutlinedInput-root': {
          borderRadius: 50, // Add border radius
        },
      }}
      noValidate
      autoComplete="off">
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
        </Box>
      
       {/*  <Box sx={{
        '& > :not(style)': { mt: 1, width: '25ch' },
        borderRadius: 50, // Add border radius
        '& .MuiOutlinedInput-root': {
          borderRadius: 50, // Add border radius
        },
      }}>

        <FormControl fullWidth margin="normal"  disabled={!category}>
          <InputLabel id="subcategory-label">الفئة المتفرعة منها</InputLabel>
          <Select
            labelId="subcategory-label"
            id="subcategory-select"
            value={subcategory}
            onChange={handleSubcategoryChange}
          >
            {category && options[category].map((suboption) => (
              <MenuItem key={suboption} value={suboption}>{suboption}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>*/}
       <Box sx={{
        '& > :not(style)': { mt: 1, width: '25ch' },
        borderRadius: 50, // Add border radius
        '& .MuiOutlinedInput-root': {
          borderRadius: 50, // Add border radius
        },
      }}>
       {matiereExamField}

       </Box>





            {/*       {categoriesList.map((categorie) => (
  <React.Fragment key={categorie.cc}>
    {categorie.name_categorie === 'تجويد' && ( // Check if the ID matches matiereExam
      <Box sx={{
        '& > :not(style)': { mt: 1, width: '25ch' },
        borderRadius: 50, // Add border radius
        '& .MuiOutlinedInput-root': {
          borderRadius: 50, // Add border radius
        },
      }}>
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
    )}
  </React.Fragment>
))}*/}
                  <Box sx={{
                    '& > :not(style)': { mt: 1, width: '25ch' },
                    borderRadius: 50, // Add border radius
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 50, // Add border radius
                    },
                  }}>

            <TextField id="outlined-basic" label="الدورة" variant="outlined" InputProps={{
                style: {
                  borderRadius: 50, // Adjust the border radius as needed
                },
                
              }}  value={period} onChange={(e)=>setPeriod(e.target.value)}/>
                  </Box>

                    <Box display="flex" flexDirection="column" justifyContent="center">
                      <Typography variant="body1" sx={{ mt: 1 }}>
                      الفئة المختارة: {matiereExam || 'None'}
                      </Typography>
                      <Typography variant="body1">
                      الفئة الفرعية المختارة:  {groupe || 'None'}
                      </Typography>
                    </Box>
                    
                  </Box>
                  {/*///////////////////////////the end second row */}
                  <Button variant="contained" color="primary" type="submit">
                إضافة
                </Button>
            </form>
                               {/*///////////////////////////////////////////////////////////// end form input*/}
                
                </Box>
                               {/*///////////////////////////////////////////////////////////// table d'exam*/}

                <Box px={2} py={3}>
                    <Typography variant="h6" fontWeight="bold" mb={2}  style={{color:'#2A5551',fontFamily:'Cairo',fontSize:'25px'}}>
                    جدول الإمتحانات
                    </Typography>

                    <Box position="relative" height={400} overflow="auto">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                <TableRow>
                        <TableCell align="center">الإمتحان</TableCell>
                        <TableCell align="center">اليوم</TableCell>
                        <TableCell align="center">بداية الوقت</TableCell>
                        <TableCell align="center">نهاية الوقت</TableCell>
                        <TableCell align="center">المادة</TableCell>
                        <TableCell align="center">نوع الإمتحان</TableCell>
                        <TableCell align="center">القاعة</TableCell>
                        <TableCell align="center">رقم القاعة</TableCell>

                        <TableCell align="center">المعلم</TableCell>
                        <TableCell align="center">المجموعة</TableCell>
                        <TableCell align="center">القراءة</TableCell>
                        <TableCell align="center">الفترة</TableCell>
                        <TableCell align="center">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Switch
                                    checked={checked}
                                    onChange={handleToggle}
                                    color="primary"
                                    title={title}
                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                           
                                        </Box>
                                    ) : (
                                      sortedExams.map(item => (
                                        <TableRow key={item._id}>
                                            <TableCell align="center">{item.NameExam}</TableCell> {/* Assuming 'exam' field */}
                                            <TableCell align="center">{item.DateExam}</TableCell> {/* Assuming 'day' field */}
                                            <TableCell align="center">{item.heureDebut}</TableCell> {/* Assuming 'startTime' field */}
                                            <TableCell align="center">{item.heureFin}</TableCell> {/* Assuming 'endTime' field */}
                                            <TableCell align="center">{item.matiereExam.name_categorie}</TableCell> {/* Assuming 'subject' field */}
                                            <TableCell align="center">{item.typeExam}</TableCell> {/* Assuming 'examType' field */}
                                            <TableCell align="center">{item.salleExam.name_salle}</TableCell> {/* Assuming 'hall' field */}
                                            <TableCell align="center">{item.salleExam.numero_salle}</TableCell> {/* Assuming 'hall' field */}

                                            <TableCell align="center">
                                              {item.teachers.map((teacher, index) => (
                                                <React.Fragment key={teacher._id}>
                                                  {teacher.name_arabe}
                                                  {/* Add comma if not the last teacher */}
                                                  {index !== item.teachers.length - 1 && ', '}
                                                </React.Fragment>
                                              ))}
                                            </TableCell>                                            <TableCell align="center">{item.groupe.name_group}</TableCell> {/* Assuming 'group' field */}
                                            <TableCell align="center">{item.recite}</TableCell> {/* Assuming 'recite' field */}
                                            <TableCell align="center">{item.period}</TableCell> {/* Assuming 'period' field */}
                                            <TableCell align="center">
                                                <Button variant="contained" color="secondary" onClick={() => handleDelete(item._id)}>
                                                <MdDelete />

                                                </Button>
                                                <Button variant="contained"  >
                                                <MdEditDocument />

                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                                                   {/*///////////////////////////////////////////////////////////// end table */}

                    <Box px={2} py={2} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1">
                        No of Exams scheduled: {exams.length}
                    </Typography>
                    <Box display="flex" gap={2}>
                        <Button variant="contained"  onClick={handleClearAll}>
                            CLEAR ALL
                        </Button>
                        <Button variant="contained"  onClick={handleNext}>
                            NEXT
                        </Button>
                    </Box>
                </Box>
                </Box>
    </Box>
    </div>
    </div>
  )
}
