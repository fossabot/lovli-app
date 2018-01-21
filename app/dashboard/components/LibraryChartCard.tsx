import * as React from 'react';
import { Link } from 'react-router-dom';
import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Card from 'material-ui/Card/Card';
import CardContent from 'material-ui/Card/CardContent';
import Button from 'material-ui/Button/Button';
import CardActions from 'material-ui/Card/CardActions';
import Typography from 'material-ui/Typography/Typography';
import { ResponsiveContainer, AreaChart, XAxis, Area, CartesianGrid, Tooltip } from 'recharts';
import { LovliBlue, LovliGreen, LovliRed } from '../../utils/colors';

type withStyleProps = 'card' | 'chart'| 'content';

interface LibraryChartCardState {
	root: string;
};

interface LibraryChartCardProps {
	data: any[]
};

const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	} as React.CSSProperties,
	content: {
		flexGrow: 1
	} as React.CSSProperties,
	chart: {
		flexGrow: 1,
		boxSizing: 'border-box',
		padding: '10px',
		width: '100%',
		minHeight: 300,
		height: 'calc(100vh / 2 - 200px)',
		backgroundColor: '#fff',
  } as React.CSSProperties,
});


class LibraryChartCard extends React.Component<LibraryChartCardProps & WithStyles<withStyleProps>, LibraryChartCardState> {

  render() {
    const { classes, data } = this.props;

    return (

		<Card className={classes.card}>
			<CardContent className={classes.chart}>
					<Typography type="headline" component="h2">Lövli Lib Size</Typography>

					<ResponsiveContainer>
						<AreaChart data={data} margin={{top: 30, right: 5, left: 5, bottom: 30}}>
							<defs>
								<linearGradient id="colorTracks" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={LovliBlue['500']} stopOpacity={0.8}/>
									<stop offset="95%" stopColor={LovliBlue['500']} stopOpacity={0}/>
								</linearGradient>
								<linearGradient id="colorArtists" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={LovliGreen['500']} stopOpacity={0.8}/>
									<stop offset="95%" stopColor={LovliGreen['500']} stopOpacity={0}/>
								</linearGradient>
								<linearGradient id="colorPlaylists" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={LovliRed['500']} stopOpacity={0.8}/>
									<stop offset="95%" stopColor={LovliRed['500']} stopOpacity={0}/>
								</linearGradient>
							</defs>
							<XAxis dataKey="name"/>

							<CartesianGrid strokeDasharray="3 3"/>
							<Tooltip />

							<Area type='monotone' dataKey='playlists' stackId="1" stroke={LovliRed['500']} fill='url(#colorPlaylists)' />
							<Area type='monotone' dataKey='artists' stackId="1" stroke={LovliGreen['500']} fill='url(#colorArtists)' />
							<Area type='monotone' dataKey='tracks' stackId="1" stroke={LovliBlue['500']} fill='url(#colorTracks)' />
						</AreaChart>
					</ResponsiveContainer>
			</CardContent>
			<CardActions>
				<Button dense component={(props:any) => <Link {...props} to="/login" />}>go digging!</Button>
			</CardActions>
		</Card>
    );
  }
}


const rootComponent = withStyles(styles)<{}>(LibraryChartCard);
export default rootComponent as any as React.StatelessComponent<LibraryChartCardProps>;
