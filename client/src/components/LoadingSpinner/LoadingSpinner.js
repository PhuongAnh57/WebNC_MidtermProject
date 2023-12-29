import styles from './LoadingSpinner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LoadingSpinner() {
    return (
        <div className={cx('spinner-container')}>
            <div className={cx('loading-spinner')}></div>
        </div>
    );
}

export default LoadingSpinner;
