import { ShopLayout } from "@/components/layouts"
import { Chip, Grid, Link, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const column: GridColDef[]=[
    { field:'id', headerName: 'ID',width:100},
    { field:'fullname', headerName: 'Nombre Completo', width: 200},
    { field:'paid', 
        headerName: 'Pagada',
        width: 200,
        description:'Muestra informacion si esta pagada o no',
        renderCell: (params ) => {
                return (
                    params.row.paid
                    ?<Chip color="success" label='pagada' variant="outlined"/>
                    :<Chip color="error" label='no pagada' variant="outlined"/>
                )
        }
    },
    { field:'order', 
        headerName: 'Ver Order',
        width: 200,
        sortable:false,
        renderCell: (params ) => {
                return (
                            <Link href={`/orders/${params.row.id}`} style={{textDecoration:'underline'}}>
                        ver order
                    </Link> 
                )
        }
    },
];

const row =[
    {id:1 ,paid:true, fullname:'Abel Marrero'},
    {id:2 ,paid:true, fullname:'Ernesto Perez'},
    {id:3 ,paid:false, fullname:'Marlon Zaballa'},
    {id:4 ,paid:true, fullname:'Yukka Aguilar'},
    {id:5 ,paid:false, fullname:'Evelio Vega'},
]

const HistoryPage = () => {
  return (
    <ShopLayout title={"Historial de ordenes"} pageDescription={"historial de ordenes del cliente"} >
        <Typography variant='h1' component='h1' >Historial de ordenes</Typography>
        <Grid container>
            <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                <DataGrid
                rows={row}
                columns={column}
                autoPageSize
                
                
                />
            </Grid>
        </Grid>
    </ShopLayout>
    
    )
}

export default HistoryPage