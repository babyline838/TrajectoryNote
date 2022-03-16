/**
- Record := Time, Location, Traffic, ToDo, WearMask, Comment, [] Contacts
- Contact := Name, Relationship,  WearMask, Gender, Tel, Organization
**/
//
const {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  Container,
  CssBaseline,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Collapse,
  Icon,
  Checkbox,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
  Grid,
  Link,
  Divider,
  Dialog,DialogTitle,MuiDialogTitle,TextField,
  FormControlLabel
} = MaterialUI;

const theme = responsiveFontSizes(createMuiTheme({
  palette:{
    primary: MaterialUI.colors.blue,
  }
}));

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  iconhot: {
    color: '#f82',
  },
  iconcold: {
    color: '#6cf',
  },
  form:{
    padding: theme.spacing(3)
  },
  textfield:{
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    flexGrow: 1,
  },
}));


function Busy() {
  const classes = useStyles();
  return <Icon className={classes.iconhot}>whatshot</Icon>
}

function Free(){
  const classes = useStyles();
  return (<Icon className={classes.iconcold}>ac_unit</Icon>)
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

// function TimePicker(props){
//   const [startDate, setStartDate] = React.useState(new Date());
//   return (
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       timeInputLabel=":"
//       dateFormat="MM/dd/yyyy hh:mm"
//       showTimeInput
//     />
//   );
// }

function ContactRow(props){
  const classes = useStyles();
  const handleChange = (event) => {
    let newinfo=props.info;
    if(event.target.id!="with_mask"){
      newinfo[event.target.id]=event.target.value;
    } else {
      newinfo[event.target.id]=event.target.checked;
    }
    props.updatedata(newinfo);
  };
  return (
    <Grid container spacing={2} style={{marginLeft:theme.spacing(1)}}>
    <Grid item xs={4} sm={4} md={4}>
      <TextField
        id="name"
        label="姓名"
        value={props.info.name}
        margin="dense"
        onChange={handleChange}
    /></Grid>
    <Grid item xs={5} sm={5} md={5} style={{alignSelf:'flex-end'}}>
      <FormControlLabel
        control={
          <Checkbox  checked={props.info.with_mask} disableRipple color="primary" onChange={handleChange}  name="with_mask" id="with_mask"  inputProps={{ 'aria-label': 'primary checkbox' }}/>
        }
        label="对方已戴口罩"
    /></Grid>
    <Grid item xs={2} sm={2} md={2} style={{marginLeft:"-1.2em"}}>
      <IconButton  disableRipple color="primary" onClick={()=>{props.handleDeleteContact();}}>
        <Icon style={{fontSize:'1.2em'}}>delete</Icon>
      </IconButton>
    </Grid>


    {/**
    <Grid item xs={6} sm={4} md={3}>
      <TextField
        id="relation"
        label="关系"
        value={props.info.relation}
        margin="dense"
        onChange={handleChange}
    /></Grid>
    <Grid item xs={6} sm={4} md={3}>
      <TextField
        id="gender"
        label="性别"
        value={props.info.gender}
        margin="dense"
        onChange={handleChange}
    /></Grid>
    <Grid item xs={6} sm={4} md={3}>
      <TextField
        id="telphone"
        label="电话号码"
        value={props.info.telphone}
        margin="dense"
        onChange={handleChange}
    /></Grid>
    **/}
    <Grid item xs={10} sm={10} md={10}>
      <TextField
        fullWidth
        id="organization"
        label="学院/单位"
        value={props.info.organization}
        margin="dense"
        onChange={handleChange}
    /></Grid>
    </Grid>
  );
}

function AddDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  const [info,setinfo]=React.useState({
    id:next_record_id,
    time_start:dateFormat('YYYY-mm-ddTHH:MM',new Date()),
    time_end:dateFormat('YYYY-mm-ddTHH:MM',new Date()),
    location:"",
    traffic:"无",
    todo:"",
    with_mask:false,
    comment:"",
  })
  let [contacts,setcontacts]=React.useState([{
    name:"",
    relation:"",
    with_mask:false,
    gender:"",
    telphone:"",
    organization:"",
  }]);

  const handleSubmit = ()=>{
    let data=info;
    data.close_contacts=contacts;
    let valid=true;
    // Validation
    // console.log(data);
    // window.var_data=data;
    if(valid){
      data.id=info.id;
      props.updatecallback(data);
      onClose();
    } else {
      // set err
    }
  };
  const handleAddContact = ()=>{
    setcontacts([...contacts,{
      name:"",
      relation:"",
      with_mask:false,
      gender:"",
      telphone:"",
      organization:"",
    }]);
  };

  const handleDeleteContactFactory = (idx)=>{
    return ()=>{
      setcontacts(contacts.filter((e,i)=>i!=idx));
    };
  };
  const updatecontacts = (idx)=>{
    return (item)=>{
      setcontacts(contacts.map((e,i)=>i==idx?item:e));
    }
  }
  const handleChange = (event) =>{
    let newinfo=info;
    if(event.target.id=="with_mask"){
      newinfo[event.target.id]=event.target.checked;
    } else if(event.target.id=="time_start"){
      newinfo[event.target.id]=event.target.value;
      newinfo.time_end=event.target.value;
    } else {
      newinfo[event.target.id]=event.target.value;
    }
    setinfo({...newinfo});
  };
  return (
    <Dialog maxWidth='xs' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        添加记录
        {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
        ) : null}
      </DialogTitle>
      <form className={classes.form} noValidate autoComplete="off" style={{textAlign:'center'}}>
        <TextField fullWidth required type="datetime-local" className={classes.textfield} value={info.time_start} onChange={handleChange} name="time_start" id="time_start" label="开始时间"/>
        <TextField fullWidth required type="datetime-local" className={classes.textfield} value={info.time_end} onChange={handleChange} name="time_end" id="time_end" label="结束时间"/>
        <TextField fullWidth required className={classes.textfield} value={info.location} onChange={handleChange} name="location" id="location" label="地点" />
        <TextField fullWidth required className={classes.textfield} value={info.traffic} onChange={handleChange} name="traffic" id="traffic" label="交通方式" />
        <TextField fullWidth required className={classes.textfield} value={info.todo} onChange={handleChange} name="todo" id="todo" label="做什么事" />
        <FormControlLabel
          control={
            <Checkbox  checked={info.with_mask} color="primary" onChange={handleChange}  name="with_mask" id="with_mask"  inputProps={{ 'aria-label': 'primary checkbox' }}/>
          }
          label="已戴口罩"
        />
        <TextField fullWidth className={classes.textfield} value={info.comment} onChange={handleChange} name="comment" id="comment" label="备注" />

        <List>
          <Grid container spacing={4}>
            {
              contacts?.map((contact,idx) => (
              <Grid item key={idx} xs={12} sm={12} md={12} style={{marginTop:'15px'}}>
              <Paper elevation={4}>
                <ContactRow info={contact} setinfo={updatecontacts(idx)} idx={idx} handleDeleteContact={handleDeleteContactFactory(idx)} updatedata={updatecontacts(idx)}/>
              </Paper></Grid>))
            }
          </Grid>
        </List>
        <Button size="large" variant="contained" color="primary" disableRipple onClick={handleAddContact} style={{marginTop:'15px',marginRight:'40px'}}>添加接触者</Button>
        <Button size="large" variant="contained" color="primary" onClick={handleSubmit} style={{marginTop:'15px'}}>确认</Button>
      </form>
    </Dialog>
  );
}

function EditDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  let info=props.defaultinfo;
  const updatedata=props.updatedata;

  let contacts=props.defaultinfo.close_contacts;

  const [need_update,setupdate]=React.useState(false);
  const handleSubmit = ()=>{
    let data=info;
    let valid=true;
    // Validation
    // console.log(data);
    // window.var_data=data;
    if(valid){
      data.id=info.id;
      props.updatecallback(data);
      onClose();
    } else {
      // set err
    }
  };
  const handleAddContact = ()=>{
    let newcontacts=[...contacts,{
      name:"",
      relation:"",
      with_mask:false,
      gender:"",
      telphone:"",
      organization:"",
    }];
    setcontacts(newcontacts);
  };
  const setcontacts = (list)=>{
    console.log(list)
    updatedata({...info,close_contacts:list});
  };

  const handleDeleteContactFactory = (idx)=>{
    return ()=>{
      // contacts.splice(idx,1);
      let newcontacts=contacts.filter((e,i)=>i!=idx)
      // updatedata({...info,clo});
      setcontacts(newcontacts);
    };
  };
  const updatecontacts = (idx)=>{
    return (item)=>{
      setcontacts(contacts.map((e,i)=>i==idx?item:e));
    }
  }
  const handleChange = (event) =>{
    let newinfo=info;
    if(event.target.id=="with_mask"){
      newinfo[event.target.id]=event.target.checked;
    } else if(event.target.id=="time_start"){
      newinfo[event.target.id]=event.target.value;
      newinfo.time_end=event.target.value;
    } else {
      newinfo[event.target.id]=event.target.value;
    }
    updatedata(newinfo);
  };
  return (
    <Dialog maxWidth='xs' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        编辑记录
        {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
        ) : null}
      </DialogTitle>
      <form className={classes.form} noValidate autoComplete="off" style={{textAlign:'center'}}>
        <TextField fullWidth required type="datetime-local" className={classes.textfield} value={info.time_start} onChange={handleChange} name="time_start" id="time_start" label="开始时间"/>
        <TextField fullWidth required type="datetime-local" className={classes.textfield} value={info.time_end} onChange={handleChange} name="time_end" id="time_end" label="结束时间"/>
        <TextField fullWidth required className={classes.textfield} value={info.location} onChange={handleChange} name="location" id="location" label="地点" />
        <TextField fullWidth required className={classes.textfield} value={info.traffic} onChange={handleChange} name="traffic" id="traffic" label="交通方式" />
        <TextField fullWidth required className={classes.textfield} value={info.todo} onChange={handleChange} name="todo" id="todo" label="做什么事" />
        {
          // <TextField fullWidth required className={classes.textfield} value={info.with_mask?"是":"否"} onChange={handleChange} name="with_mask" id="with_mask" label="是否戴口罩" />
        }
        <FormControlLabel
          control={
            <Checkbox  checked={info.with_mask} color="primary" onChange={handleChange}  name="with_mask" id="with_mask"  inputProps={{ 'aria-label': 'primary checkbox' }}/>
          }
          label="已戴口罩"
        />
        <TextField fullWidth className={classes.textfield} value={info.comment} onChange={handleChange} name="comment" id="comment" label="备注" />

        <List>
          <Grid container spacing={4}>
            {
              contacts?.map((contact,idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} style={{marginTop:'15px'}}>
              <Paper elevation={4}>
                <ContactRow info={contact} setinfo={(data)=>setcontacts(data)} idx={idx} handleDeleteContact={handleDeleteContactFactory(idx)} updatedata={updatecontacts(idx)}/>
              </Paper></Grid>))
            }
          </Grid>
        </List>
        <Button size="large" variant="contained" color="primary" disableRipple onClick={handleAddContact} style={{marginTop:'15px',marginRight:'40px'}}>添加接触者</Button>
        <Button size="large" variant="contained" color="primary" onClick={handleSubmit} style={{marginTop:'15px'}}>确认</Button>
      </form>
    </Dialog>
  );
}

function show_time(timestamp){
  // const date=new Date(timestamp);
  // return date.toLocaleString();
  return String(timestamp)
}

function ContactDisplayItem(props){
  const info=props.info;
  const classes=useStyles();
  return
}

function RecordItem(props) {
  const info=props.info;
  const handleClickEdit=props.editcallback;
  const classes=useStyles();
  return (
  <Grid item xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div display='inline-flex'>
          <Typography variant="h5" className='h2' style={{display:"inline-flex"}}>
            {info.location}
          </Typography>
          <IconButton aria-label="edit" color="primary" size='small' onClick={handleClickEdit} style={{display:"inline-flex",float:"right"}}>
            <Icon>edit</Icon>
          </IconButton>
        </div>
        <div>
          {
            (info.time_start==info.time_end)?
              (<Typography variant="body1">
                时间: {show_time(info.time_start)}
              </Typography>)
            :(<React.Fragment>
              <Typography variant="body1">
                开始时间: {show_time(info.time_start)}
              </Typography>
              <Typography variant="body1">
                结束时间: {show_time(info.time_end)}
              </Typography>
              </React.Fragment>)
          }

          <Typography variant="body1">
            地点: {info.location}
          </Typography>
          <Typography variant="body1">
            交通方式: {info.traffic}
          </Typography>
          <Typography variant="body1">
            做什么事: {info.todo}
          </Typography>
          <Typography variant="body1">
            是否戴了口罩: {info.with_mask?"是":"否"}
          </Typography>
          <Typography variant="body1">
            备注: {info.comment}
          </Typography>
          <Divider />
          <List dense={true}>
            {
              info.close_contacts.map((contact,idx)=>(
                <React.Fragment key={idx}>
                <ListItem>
                  <ListItemText primary={contact.name + " | " + (contact.with_mask?"":"未") +" 戴口罩"} style={{color: contact.with_mask?'black':'red'}}/>
                </ListItem>
                <Divider />
                </React.Fragment>
              ))
            }
          </List>
        </div>
      </CardContent>
    </Card>
  </Grid>);
}

function Album(props) {
  // const [init,setinit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editinfo, setEditinfo] = React.useState({});
  const [recorddata, setrecorddata_impl] = React.useState(props.data);
  // if(!init){
  //   setrecorddata_impl(props.data);
  //   setinit(true);
  // }

  const setrecorddata = (item)=>{
    localStorage['contact_info']=JSON.stringify(item);
    setrecorddata_impl(item);
  };

  const handleClickAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const append_data = (item) => {
    setrecorddata([...recorddata,item]);
  };

  const set_data = (list) => {
    setrecorddata_impl(list);
  };

  const modify_data = (item) => {
    setEditinfo(item);
    let data=[];
    for(let i=0;i<recorddata.length;++i){
      if(item.id==recorddata[i].id){
        data.push(item);
      } else {
        data.push(recorddata[i]);
      }
    }
    setrecorddata_impl([...data]);
  };

  const modify_data_save = (item) => {
    let data=[];
    for(let i=0;i<recorddata.length;++i){
      if(item.id==recorddata[i].id){
        data.push(item);
      } else {
        data.push(recorddata[i]);
      }
    }
    setrecorddata(data);
  };

  const handleClickEdit = (info) => {
    setEditinfo(info);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const classes = useStyles();

  console.log(recorddata)

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            行程记录本
          </Typography>
          <Button color="inherit" onClick={export_records}><Icon>get_app</Icon>导出</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item key={-1} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent} style={{minHeight:100,textAlign:'center'}}>
                  <Typography gutterBottom variant="h4" component="h2">
                    新建记录
                  </Typography>
                  <IconButton color="primary" onClick={handleClickAdd} >
                    <Icon style={{fontSize:'3em'}}>add_circle_outline</Icon>
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
            {recorddata.slice().reverse().map((info) => (<RecordItem info={info} key={info.id} editcallback={()=>handleClickEdit({...info})} />))}
          </Grid>
        </Container>
      </main>
      <AddDialog open={openAdd} onClose={handleCloseAdd} updatecallback={append_data}/>
      <EditDialog open={openEdit} onClose={handleCloseEdit} updatecallback={modify_data_save} updatedata={modify_data} setdata={set_data} defaultinfo={editinfo} />
    </React.Fragment>
  );
}

// TODO: Format output data into csv
function export_records_json(){
  let data=localStorage['contact_info'];
  let uri = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
  let link=document.createElement("a");
  link.href=uri;
  link.download="行程记录.json";
  link.click();
  document.body.removeChild(link);
}

function export_records(){
  let data=JSON.parse(localStorage['contact_info']);
  var max_close_contacts_length = 1;

  data.forEach( (item) => {
      if (item.close_contacts.length > max_close_contacts_length) max_close_contacts_length = item.close_contacts.length
  })

  const headers = [
      "编号",
      "开始时间",
      "结束时间",
      "地点",
      "交通工具",
      "做什么事",
      "是否戴口罩",
      "备注"
  ]

  for (let i = 0; i < max_close_contacts_length; i++) {
      headers.push("密接"+i+"姓名")
      headers.push("密接"+i+"关系")
      headers.push("密接"+i+"是否带口罩")
      headers.push("密接"+i+"性别")
      headers.push("密接"+i+"电话")
      headers.push("密接"+i+"单位")
  }

  function convertToCSV(objArray) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';

      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','
              var element = array[i][index]
              if (Array.isArray(element)) {
                  let close_contacts_length = element.length;
                  for (var j =0 ; j < close_contacts_length; j++){
                      for (var subindex in element[j]){
                          var subelement = element[j][subindex]
                          if ( typeof subelement =='string') subelement = subelement.replace(/,/g, '，')
                          line += subelement + ",";
                      }
                  }
                  for (var j = close_contacts_length ; j < max_close_contacts_length; j++){
                      for (var k=0 ; k < 6; k++){
                          line += ",";
                      }
                  }
              }else{
                  if ( typeof element =='string') element = element.replace(/,/g, '，')
                  line += element;
              }
          }

          str += line + '\r\n';
      }

      return str;
  }

  function exportCSVFile(headers, items, fileTitle) {
      if (headers) {
          items.unshift(headers);
      }

      // Convert Object to JSON
      var jsonObject = JSON.stringify(items);

      var csv = convertToCSV(jsonObject);

      var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
      csv = '\uFEFF' + csv;
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", exportedFilenmae);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }

  exportCSVFile(headers, data, '行程记录'); // call the exportCSVFile() function to process the JSON and trigger the download
}

let data=JSON.parse(localStorage['contact_info']??"[]");
// let data=[
//   {
//     id:5,
//     time_start:1647311997610,
//     time_end:
//     location:"第四餐饮大楼2楼",
//     traffic:"无",
//     todo:"早餐",
//     with_mask:true,
//     comment:"鸡蛋",
//     close_contacts:[
//       {
//         name:"打饭阿姨",
//         relation:"",
//         with_mask:false,
//         gender:"女",
//         telphone:"11101011010",
//         organization:"餐饮服务部",
//       },
//       {
//         name:"打饭大叔",
//         relation:"",
//         with_mask:true,
//         gender:"男",
//         telphone:"11101011010",
//         organization:"餐饮服务部",
//       }
//     ]
//   }
// ]

let next_record_id=Math.max(...(data.map(e=>e.id)))??0+1;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Album data={data}/>
  </ThemeProvider>,
 document.querySelector('#container')
)
