import pandas as pd
import numpy as np
import argparse

def main():
	parser = argparse.ArgumentParser()

	parser.add_argument(
		"--input_path",
		type=str,
		default=None,
		help="Path to csv input",
	)
	args = parser.parse_args()

	input_file = args.input_path
	report = pd.read_csv(input_file)
	report[['Season','State/Crop/District']] = report[['Season','State/Crop/District']].fillna("")

	state = ""
	district = ""
	crop = ""
	output_list = []
	for index,row in report.iterrows():
		if index+1<len(report):
			if row['Season'] == "" and 'Total' not in row['State/Crop/District']  and report.loc[index+1]['Season'] == "":
				#New State !
				state = row['State/Crop/District']
				#print("---------------",state)
			elif row['Season']=="" and 'Total' not in row['State/Crop/District']:
				#New Crop!
				crop = row['State/Crop/District']
				#print(crop)
			elif row['State/Crop/District'] != "":
				#New District!
				district = row['State/Crop/District'].split('.')[-1]
			else:
				#Year within a district
				output_list.append([crop,state,district,row['Year'],row['Season'],row['Area (Hectare)'],row['Production (Tonnes)'],row['Yield (Tonnes/Hectare)']])
	

	output =  pd.DataFrame(np.array(output_list),columns=['crop','state','district','year','season','area','production','yield'])
	output = output.sort_values(by=['crop'])
	output_file = input_file.split('.')
	output_file = output_file[0]+"_output."+output_file[-1]
	output.to_csv(output_file,index=False)


if __name__ == "__main__":
	main()