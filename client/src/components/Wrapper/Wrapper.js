import classnames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Wrapper.module.scss';

const cx = classnames.bind(styles);

function Wrapper({ my, center, className, children }) {
    return (
        <div className={cx('wrapper', { [`my-${my}`]: my, center, [className]: className })}>{children}</div>
    );
}

Wrapper.propTypes = {
    my: (props, propName, componentName) => {
        const value = props[propName];
        if (value === undefined) {
            return;
        }
        if (typeof value !== 'number') {
            return new Error(
                `${propName} in ${componentName} must be a number.`,
            );
        }
        if (value < 1 || value > 10) {
            return new Error(
                `${propName} in ${componentName} must be between 1 and 10.`,
            );
        }
    },
    children: PropTypes.node.isRequired,
};

export default Wrapper;
