import { useActivityContext } from '../../hooks/useActivityContext';

import type { FormState } from '../../types/reducerTypes';

import styles from './ConfigurationChips.module.scss';

export default function ConfigurationChips() {
    type FormStateMapperType = {
        key: keyof FormState;
        icon: string;
        options: Record<string, string>;
        label: string;
    };

    const { formState, setResetForm, setIsFormVisible, setIsListVisible } = useActivityContext();

    const formStateMapper: FormStateMapperType[] = [
        {
            key: 'time',
            icon: 'icon-duration',
            options: {
                '1' : 'Kilkanaście minut',
                '2' : 'Około godzinę',
                '3' : 'Więcej niż godzinę'
            },
            label: 'Czas'
        },
        {
            key: 'involvementLevel',
            icon: 'icon-level',
            options: {
                '1' : 'Niskie',
                '2' : 'Średnie',
                '3' : 'Wysokie'
            },
            label: 'Poziom zaangażowania'
        },
        {
            key: 'type',
            icon: 'icon-type',
            options: {
                'mental' : 'Umysłowe',
                'physical' : 'Fizyczne'
            },
            label: 'Typ'
        }
    ];

    const getChipContent = (key: keyof typeof formState, value: string | number): {option: string, icon: string, label: string} => {
        const mapping = formStateMapper.find(item => item.key === key);

        const valueStr = String(value);

        if (key === 'involvementLevel') {
            return {
                option: mapping?.options[valueStr] || '',
                icon: mapping?.icon ? `${mapping.icon}-${valueStr}` : '',
                label: mapping?.label || ''
            }
        } else if (key === 'type') {
            return {
                option: mapping?.options[valueStr] || '',
                icon: valueStr === 'mental' ? 'icon-brain' : 'icon-strength',
                label: mapping?.label || ''
            }
        } else {
            return {
                option: mapping?.options[valueStr] || '',
                icon: mapping?.icon || '',
                label: mapping?.label || ''
            }
        }
    };

    const handleResetClick = () => {
        setIsFormVisible(false);
        setIsListVisible(false);
        setResetForm();
    }

    const hasAtLeastOneChip = Object.values(formState ?? {}).some(value => value !== null);

    return hasAtLeastOneChip && (
        <div className={styles['brd-configuration-chips__wrapper']}>
            <div className={styles['brd-configuration-chips']}>
                {
                    (Object.entries(formState ?? {}) as [keyof FormState, FormState[keyof FormState]][]).map(([key, value]) => {
                        const {option, icon, label} = getChipContent(key, value as string | number);

                        return (
                            value !== null && value !== undefined && <div key={key} className={styles['brd-configuration-chips__chip']}>
                                <i className={icon}></i>
                                <span>{label}: {option}</span>
                            </div>
                        )
                    })
                }
            </div>
            <button className={styles['brd-configuration-chips__reset']} onClick={handleResetClick}>Reset</button>
        </div>
    )
}
