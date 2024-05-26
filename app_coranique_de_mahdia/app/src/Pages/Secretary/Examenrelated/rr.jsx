import React, { useEffect, useRef, useState } from 'react';
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
import { getAllSalles } from '../../../redux/salleRelated/salleHandle';
import { getAllCategories } from '../../../redux/categorieRelated/categorieHandle';
import dayjs from 'dayjs';

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

  const { teachersList, loading: teachersLoading, error: teachersError } = useSelector((state) => state.teacher);
  const { categoriesList, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categorie);
  const { sallesList } = useSelector((state) => state.salle);
  const { groupsList, loading: groupsLoading, error: groupsError } = useSelector((state) => state.group);
  
  const [NameExam, setNameExam] = useState('');
  const [DateExam, setDateExam] = useState('');
  const [heureDebut, setHeureDebut] = useState(dayjs());
  const [heureFin, setHeureFin] = useState(dayjs());
  const [typeExam, setTypeExam] = useState('');
  const [matiereExam, setMatiereExam] = useState('');
  const [salleExam, setSalleExam] = useState(false);
  const [groupe, setGroupe] = useState('');
  const [teachers, setTeachers] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);

  const [loading, setLoading] = useState(false);
  const [sortedExams, setSortedExams] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [exams, setExams] = useState([]);
  const [cleared, setCleared] = useState(false);
  const [category, setCategory] = useState('');

  const [subcategory, setSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedsubCategory, setSelectedsubCategory] = useState('');
// Add a state variable to track the current sort option
const [sortBy, setSortBy] = useState('date'); // Initialize with 'date' as default

// Modify the handleToggle function to toggle between sorting options


// Determine the title based on the current sort option
const title = sortBy === 'date' ? 'Sort By Date' : 'Sort By Branch';

// Determine the checked status of the Switch based on the current sort option
const checked = sortBy === 'date';

// Determine the sorting logic for the exams based on the current sort option


// Use the title and checked status in the Switch component
<Switch
  checked={checked}
  onChange={handleToggle}
  color="primary"
  title={title}
/>

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
    const fetchGroupsByCategory = () => {
      if (matiereExam) {
        const filtered = groupsList.filter(group => group.categorie === matiereExam);
        setFilteredGroups(filtered);
      }
    };
    fetchGroupsByCategory();
  }, [matiereExam, groupsList]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setSubcategory('');
  };

  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
  };

  const handleCategoryTableChange = (event, categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubcategoryTableChange = (event) => {
    setSelectedsubCategory(event.target.value);
  };

  const handleSlot = () => {
    // Handle slot change
  };

  const handleFiles = () => {
    // Handle file upload
  };

  useEffect(() => {
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
    // Handle scheduling
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleDelete = (id) => {
    // Handle delete
  };

  const handleClearAll = () => {
    // Handle clear all
  };

  const handleNext = () => {
    // Handle next
  };

  return (
    <div>
      <AppBar position="static" sx={{ marginTop: '20px', direction: 'ltr', backgroundColor: 'white' }}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ flexGrow: 1, alignSelf: 'flex-end', color: '#2A5551', fontFamily: 'Cairo', fontSize: '30px', margin: '10px 0px 10px 0px' }}
        >
          <span style={{ fontWeight: '700' }}> لوحة التحكم:</span>الإمتحانات
        </Typography>
      </AppBar>
      <div>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex" flexDirection="row" flexWrap="wrap" p={2}>
            {/*/////////////////////////////////////////////////////////////semestre box */}
            <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
              <Typography variant="h6" fontWeight="bold" style={{ color: '#2A5551', fontFamily: 'Cairo', fontSize: '20px' }}>
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
            {/*/////////////////////////////////////////////////////////////upload file csv */}
            <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
              <Typography variant="h6" fontWeight="bold" style={{ color: '#2A5551', fontFamily: 'Cairo', fontSize: '20px' }}>
                تحميل ملف من نوع
              </Typography>
              <Button variant="outlined" color="success" component="label" sx={{ ml: 2 }}>
                CSV
                <input hidden accept=".csv,.xlsx,.xls" multiple type="file" onChange={handleFiles} />
              </Button>
            </Box>
          </Box>
        </Box>
        <Container sx={{ mt: 2, ml: 2 }}>
          <Box component="form" noValidate autoComplete="off" ref={formRef} onSubmit={handleSchedule}>
            <TextField
              required
              id="NameExam"
              name="NameExam"
              label="اسم الإمتحان"
              fullWidth
              margin="normal"
              value={NameExam}
              onChange={e => setNameExam(e.target.value)}
            />
            <TextField
              id="date"
              label="تاريخ الإمتحان"
              type="date"
              value={DateExam}
              onChange={(e) => setDateExam(e.target.value)}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label="توقيت الإمتحان"
                  value={heureDebut}
                  onChange={(newValue) => setHeureDebut(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  label="توقيت نهاية الإمتحان"
                  value={heureFin}
                  onChange={(newValue) => setHeureFin(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
            <DropDownInput
              input_id="typeExam"
              title="نوع الإمتحان"
              options={['نظري', 'تطبيقي']}
              value={typeExam}
              onChange={(value) => setTypeExam(value)}
              isTarget={false}
            />
            <DropDownInput
              input_id="matiereExam"
              title="مادة الإمتحان"
              options={categoriesList.map(cat => cat.name)}
              value={matiereExam}
              onChange={(value) => setMatiereExam(value)}
              isTarget={true}
              handleSlot={handleSlot}
            />
            <DropDownInput
              input_id="groupe"
              title="مجموعة الإمتحان"
              options={filteredGroups.map(group => group.name)}
              value={groupe}
              onChange={(value) => setGroupe(value)}
              isTarget={true}
              handleSlot={handleSlot}
            />
            <DropDownInput
              input_id="teachers"
              title="أستاذ الإمتحان"
              options={teachersList.map(teacher => teacher.name)}
              value={teachers}
              onChange={(value) => setTeachers(value)}
              isTarget={false}
            />
            <FormControlLabel
              control={<Switch checked={salleExam} onChange={() => setSalleExam(!salleExam)} />}
              label="إضافة قاعة"
            />
            {salleExam && (
              <DropDownInput
                input_id="salle"
                title="قاعة الإمتحان"
                options={sallesList.map(salle => salle.name)}
                value=""
                onChange={(value) => console.log('Salle selected:', value)}
                isTarget={false}
              />
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              جدولة الإمتحان
            </Button>
          </Box>
        </Container>
        <Alert
          severity="success"
          sx={{ width: '50%', mt: 2, mx: 'auto', visibility: cleared ? 'visible' : 'hidden' }}
        >
          تم حذف الإمتحانات بنجاح!
        </Alert>
      </div>
      <Container sx={{ mt: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" style={{ color: '#2A5551', fontFamily: 'Cairo', fontSize: '20px' }}>
            الإمتحانات المجدولة
          </Typography>
          <Button variant="contained" color="error" onClick={handleClearAll} sx={{ mb: 2 }}>
            حذف الكل
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">اسم الإمتحان</TableCell>
                <TableCell align="right">تاريخ الإمتحان</TableCell>
                <TableCell align="right">وقت بداية الإمتحان</TableCell>
                <TableCell align="right">وقت نهاية الإمتحان</TableCell>
                <TableCell align="right">نوع الإمتحان</TableCell>
                <TableCell align="right">مادة الإمتحان</TableCell>
                <TableCell align="right">مجموعة الإمتحان</TableCell>
                <TableCell align="right">أستاذ الإمتحان</TableCell>
                <TableCell align="right">إجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell align="right">{exam.name}</TableCell>
                  <TableCell align="right">{exam.date}</TableCell>
                  <TableCell align="right">{exam.startTime}</TableCell>
                  <TableCell align="right">{exam.endTime}</TableCell>
                  <TableCell align="right">{exam.type}</TableCell>
                  <TableCell align="right">{exam.subject}</TableCell>
                  <TableCell align="right">{exam.group}</TableCell>
                  <TableCell align="right">{exam.teacher}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="error" onClick={() => handleDelete(exam.id)}>
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
