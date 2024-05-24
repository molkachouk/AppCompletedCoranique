import React, { useRef, useState } from 'react'
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


function DropDownInput({ input_id, title, inputRef, options, isTarget, handleSlot }) {
  const handleChange = (event) => {
    if (isTarget) {
      handleSlot(event);
    }
  };

  return (
    <FormControl variant="outlined" margin="dense" sx={{ mb: 2, minWidth: 200, mr: { md: 2, sm: 0 } }}>
      <InputLabel id={`${input_id}-label`}>{title}</InputLabel>
      <Select
        labelId={`${input_id}-label`}
        id={input_id}
        inputRef={inputRef}
        onChange={handleChange}
        label={title}
      >
        {options.map(item => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const options = {
  category1: ['Option 1.1', 'Option 1.2', 'Option 1.3'],
  category2: ['Option 2.1', 'Option 2.2', 'Option 2.3']
};

export default function ExamDashboard() {

  const semRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const branchRef = useRef();
    const slotRef = useRef();
    const subRef = useRef();
    const formRef = useRef();

    const [loading, setLoading] = useState(false);
    const [sortedExams, setSortedExams] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [exams, setExams] = useState([]);
    const [cleared, setCleared] = React.useState(false);
    const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedsubCategory, setSelectedsubCategory] = useState('');

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    // Update the options for the subcategory dropdown based on the selected category
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


 
    const subArray = ['Subject 1', 'Subject 2', 'Subject 3']; // Example subjectsvvv

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


  const handleSchedule = (event) => {
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
              <TextField id="outlined-basic" label="إسم الإمتحان" variant="outlined" />
              </Box>
                   {/*/////////////////////////////////////////////////////////////date input*/}

                {/*<TextField
                  id="date"
                  label="Date"
                  type="date"
                  inputRef={dateRef}
                  InputLabelProps={{ shrink: true }}
                              />*/}

                 <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          position: 'relative',
          marginTop:'10px',
          
        }}
      >
        <DemoItem >
          <DatePicker
          id="date"
          type="date"
          inputRef={dateRef}
          InputLabelProps={{ shrink: true }}
            sx={{ width: 260 }}
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
          />
        </DemoItem>

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
        <TimePicker label="بداية الوقت  " sx={{  '& .MuiInputLabel-root': { right:30, transformOrigin: 'right' } }}/>
      </DemoContainer>
      </Box>
      <Box  sx={{
          height: '100%',
          display: 'flex',
          position: 'relative',
          
        }}>
      <DemoContainer components={['TimePicker']} >
        <TimePicker label="نهاية الوقت " sx={{  '& .MuiInputLabel-root': { right:30, transformOrigin: 'right' } }}/>
      </DemoContainer>
      </Box>
    </LocalizationProvider>
                       {/*/////////////////////////////////////////////////////////////end date input*/}
      

                <DropDownInput input_id="matier" title="المادة" inputRef={branchRef} options={['تجويد', 'تحفيظ']} isTarget handleSlot={handleSlot} />
                <DropDownInput input_id="typeExam" title="نوع الإمتحان" inputRef={slotRef} options={['كتابي', 'شفاهي']} isTarget handleSlot={handleSlot} />
                <DropDownInput input_id="salleExam" title="القاعة " inputRef={subRef} options={subArray} />


                

                <Button variant="contained" color="primary" type="submit">
                إضافة
                </Button>
              </Box>
              {/*///////////////////////////the second row */}
              <Box display="flex" flexDirection="row" gap={2}>
      <Box  sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">الفئة</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
          >
            {Object.keys(options).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        <Box sx={{
        '& > :not(style)': { mt: 1, width: '25ch' },
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
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="body1" sx={{ mt: 1 }}>
        الفئة المختارة: {category || 'None'}
        </Typography>
        <Typography variant="body1">
        الفئة الفرعية المختارة:  {subcategory || 'None'}
        </Typography>
      </Box>
    </Box>
                  {/*///////////////////////////the end second row */}

            </form>
                               {/*///////////////////////////////////////////////////////////// end form input*/}

                </Box>
                               {/*///////////////////////////////////////////////////////////// table d'exam*/}

                <Box px={2} py={3}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
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
                                        <TableCell align="center">
                        <FormControl variant="outlined" size="small">
                          <InputLabel id="category-filter-label">Category</InputLabel>
                          <Select
                            labelId="category-filter-label"
                            id="category-filter"
                            value={selectedCategory}
                            onChange={(e) => handleCategoryTableChange(e, selectedCategory)}
                            label="Category"
                          >
                            {Object.keys(options).map((category) => (
                              <MenuItem key={category} value={category}>
                                {category}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <FormControl variant="outlined" size="small">
                          <InputLabel id="subcategory-filter-label">Subcategory</InputLabel>
                          <Select
                            labelId="subcategory-label"
                            id="subcategory-select"
                            value={subcategory}
                            onChange={handleSubcategoryTableChange}
                          >
                            {category && options[category].map((suboption) => (
              <MenuItem key={suboption} value={suboption}>{suboption}</MenuItem>
            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                                        <TableCell align="center">
                                            <Box display="flex" justifyContent="center" alignItems="center">
                                                <Switch
                                                    checked={toggle}
                                                    onChange={handleToggle}
                                                    color="primary"
                                                    title={toggle ? "Sort By Date" : "Sort By Branch"}
                                                />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                            <ThreeCircles
                                                height="65"
                                                width="65"
                                                color="#23ca85"
                                                visible={true}
                                            />
                                        </Box>
                                    ) : (
                                        sortedExams.map(item => (
                                            <TableRow key={item._id}>
                                                <TableCell align="center">{item.date}</TableCell>
                                                <TableCell align="center">{item.time}</TableCell>
                                                <TableCell align="center">{item.sem}</TableCell>
                                                <TableCell align="center">{item.branch}</TableCell>
                                                <TableCell align="center">{item.slot}</TableCell>
                                                <TableCell align="center">{item.subcode}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(item._id)}>
                                                        Delete
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
