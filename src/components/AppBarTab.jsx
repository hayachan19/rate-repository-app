import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const AppBarTab = ({ text, link, style }) => {
    return <Link to={link} component={TouchableWithoutFeedback}>
        <Text style={style} fontSize='subheading' fontWeight='bold'>{text}</Text>
    </Link>;
};

export default AppBarTab;