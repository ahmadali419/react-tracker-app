import PropTypes from 'prop-types';

export const Button = ({color , text , onClick}) => {
    return (
       <button style={{backgroundColor:color}} onClick={onClick} className="btn">{text}</button>
    )
}
Button.defaultProps = {
    color: 'steelblue',
    text:'Add'
}
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}
export default Button;
