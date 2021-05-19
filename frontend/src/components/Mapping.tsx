import { 
    Button,
    Grid, 
    MenuItem, 
    Select 
} from "@material-ui/core";
import { Loader } from "google-maps";
import { 
    FormEvent, 
    useCallback, 
    useEffect,
    useRef,
    useState 
} from "react";
import { Route } from "../util/models";
import { getCurrentPosition } from "../util/geolocation";
import { makeCarIcon, makeMarkerIcon, Map } from "../util/map";
import { RouteExistsError } from "../errors/route-exists.error";
import { useSnackbar } from "notistack";

const API_URL = process.env.REACT_APP_API_URL;
const googleMapsLoader = new Loader(process.env.REACT_APP_GOOGLE_API_KEY);
 
export const Mapping = () => {

    const [routes, setRoutes] = useState<Route[]>([]);
    const [routeIdSelected, setRouteIdSelected] = useState<string>("");
    const mapRef = useRef<Map>();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetch(`${API_URL}/routes`)
          .then((response) => response.json())
          .then((data) =>setRoutes(data));
      }, []);


    useEffect(() => {
        (async () => {
            const [, position] = await Promise.all([
              googleMapsLoader.load(),
              getCurrentPosition({ enableHighAccuracy: true }),
            ]);
            const divMap = document.getElementById("map") as HTMLElement;
            mapRef.current = new Map(divMap, {
                zoom: 15,
                center: position,
              });
            })();
        }, []);

    const startRoute = useCallback(
        (event: FormEvent) => {
        event.preventDefault();
       const route = routes.find((route) => route._id === routeIdSelected);
       
       try {
       mapRef.current?.addRoute(routeIdSelected, {
        currentMarkerOptions:{
            position: route?.startPosition,
        icon: makeCarIcon("#000"),
       },
       endMarkerOptions:{
        position: route?.endPosition,
        icon: makeMarkerIcon("#454545"),
       }
    })
    } catch (error) {
        if (error instanceof RouteExistsError) {
        enqueueSnackbar(`${route?.title} já adicionado, espere finalizar.`, {
            variant: "error",
        });
        return;
        }
        throw error;
    }
    }, [routeIdSelected, routes, enqueueSnackbar]
    );

    return (
        <Grid container style={{width:'100%', height:'100%'}}>
            <Grid item xs={12} sm={3}>
                <form onSubmit={startRoute}>
                    <Select displayEmpty fullWidth value={routeIdSelected} onChange={(event) => setRouteIdSelected(event.target.value + "")}>
                        <MenuItem value="">
                            <em>Selecione um entregador</em>
                        </MenuItem>
                        {routes.map((route, key) => (
                            <MenuItem key={key} value={route._id}>
                                {route.title}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button type="submit" color="primary" variant="contained">Iniciar corrida</Button>
                </form>
            </Grid>
            <Grid item xs={12} sm={9}>
                <div id="map" style={{width:'100%', height:'100%'}}></div>
            </Grid>   
        </Grid>
    );
};