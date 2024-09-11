package configs

import (
	"os"

	"github.com/spf13/viper"
)

type Configs struct {
	WebServerPort string `mapstructure:"WEB_SERVER_PORT"`
	WebServerHost string `mapstructure:"WEB_SERVER_HOST"`
}

func LoadConfig() *Configs {
	var configs Configs
	viper.SetConfigName("config")
	viper.SetConfigType("env")
	viper.SetConfigFile(".env")
	viper.AddConfigPath(".")
	viper.AutomaticEnv()
	err := viper.ReadInConfig()
	if err != nil {
		if err != err.(*os.PathError) {
			return nil
		}
		configs = Configs{
			WebServerPort: os.Getenv("WEB_SERVER_PORT"),
			WebServerHost: os.Getenv("WEB_SERVER_HOST"),
		}
	} else {
		err = viper.Unmarshal(&configs)
		if err != nil {
			return nil
		}
	}
	return &configs
}
